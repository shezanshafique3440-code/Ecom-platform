# Deployment Guide

## 1. Provision

- A Linux VM (or container host) with Docker + Docker Compose installed.
- A managed PostgreSQL instance (or run the bundled `db` service for
  smaller deployments).
- An S3-compatible bucket (AWS S3, Cloudflare R2, Backblaze B2, MinIO)
  for product images and chat attachments.
- Domain + TLS certificate (Let's Encrypt via `certbot`, terminated at
  Nginx or a fronting CDN).

## 2. Configure

```bash
cp .env.example .env
# Fill in: DATABASE_URL, JWT secrets, CSRF secret, S3 credentials,
# Stripe/PayPal keys, RECAPTCHA_SECRET, CORS_ORIGIN (your real domain).
```

Generate strong secrets:

```bash
openssl rand -hex 32   # run 3x for JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, CSRF_SECRET
```

## 3. Database migrations

```bash
cd packages/db
npx prisma migrate deploy
npx prisma db seed   # optional: creates an admin login for first access
```

## 4. Build & run

```bash
docker compose build
docker compose up -d
```

This starts `db`, `api` (port 4000, internal), `web` (port 3000, internal),
and `nginx` (port 80/443, public-facing reverse proxy).

## 5. TLS

Point `certbot --nginx` at `nginx/nginx.conf`, or terminate TLS at a CDN
(Cloudflare) in front of Nginx and set `X-Forwarded-Proto` — the app
already trusts the first proxy hop (`app.set('trust proxy', 1)`).

## 6. CI/CD

`.github/workflows/ci-cd.yml` lints and builds both apps on every push,
then builds Docker images on `main`. Add a deploy step at the bottom
(`docker push` to your registry + `ssh` into the host to pull and
restart) once you've chosen a registry and host.

## 7. Observability & backups

- API logs are structured JSON via `pino` — ship them to your log
  aggregator of choice (e.g. `docker logs` → Vector → your SIEM).
- Automate `pg_dump` on a cron to your S3 bucket for the admin panel's
  Backup & Restore feature; wire the restore path through a protected
  admin-only route that shells out to `pg_restore` against a maintenance
  connection.

## 8. Performance checklist (Lighthouse 95+)

- Serve product images through `next/image` with real dimensions.
- Enable Nginx/CDN caching for static assets (`/_next/static/*`).
- Keep API page sizes small (already defaulted to 24 items) and add
  Postgres indexes for any new filter columns (see indexes already on
  `Product`, `SecurityLog` in `schema.prisma`).
- Turn on HTTP/2 at the Nginx/CDN layer.
