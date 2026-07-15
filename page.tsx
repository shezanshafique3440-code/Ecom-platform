name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install API deps
        working-directory: apps/api
        run: npm install

      - name: Lint API
        working-directory: apps/api
        run: npm run lint --if-present

      - name: Build API
        working-directory: apps/api
        run: npm run build

      - name: Install web deps
        working-directory: apps/web
        run: npm install

      - name: Lint web
        working-directory: apps/web
        run: npm run lint --if-present

      - name: Build web
        working-directory: apps/web
        run: npm run build

  docker-build-push:
    needs: lint-and-build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build API image
        run: docker build -f apps/api/Dockerfile -t haat-api:${{ github.sha }} .

      - name: Build web image
        run: docker build -f apps/web/Dockerfile -t haat-web:${{ github.sha }} .

      # Push to your registry and deploy — fill in once infra is chosen
      # (e.g. docker push, then `ssh deploy@host docker compose pull && up -d`).
