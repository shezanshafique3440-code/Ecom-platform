# Roadmap — what to build next, in order

Phase 1 (done in this pass): architecture, DB schema, auth + 2FA, product
catalog, cart/wishlist, multi-vendor checkout, order tracking, vendor
application/dashboard/withdrawals, reviews, admin core, support tickets +
live chat transport, homepage UI, Docker/Nginx/CI scaffolding.

Phase 2 — payments (done):
- Stripe: PaymentIntent creation (`POST /payments/stripe/intent`) +
  webhook handler marking `Payment.status = PAID` and `Order.status =
  CONFIRMED` atomically.
- PayPal: Orders v2 create + capture flow (`/payments/paypal/create`,
  `/payments/paypal/capture`). Webhook signature verification against
  PayPal's `verify-webhook-signature` API is still a TODO — capture
  currently confirms payment synchronously on the client's return, which
  is sufficient for launch but worth hardening before high volume.
- Bank transfer: `GET /payments/bank-transfer/:orderId` returns
  beneficiary details + reference number to display at checkout.
- Crypto: Coinbase Commerce charge creation + signed webhook handler.

Remaining before this is fully production-hardened:
- PayPal webhook signature verification (currently accepts unverified).
- Idempotency keys on Stripe intent creation to avoid duplicate charges
  on client retries.
- Reconciliation job to catch missed webhooks (poll gateway status for
  any `Payment` stuck in `PENDING` past a threshold).

Phase 3 — vendor & admin panels (UI):
- `/vendor/dashboard` — analytics charts, product table, order queue.
- `/vendor/products/new` — product form wired to `POST /products`.
- `/admin` — the panels the API already supports: user/vendor tables,
  category/banner/CMS editors, security log viewer.

Phase 4 — commerce polish:
- Multi-currency: FX rate service + display conversion (store canonical
  price in vendor's currency, convert at render time).
- Multi-language: `next-intl` or `next-i18next`, extract all UI strings.
- Coupon UI in checkout, order confirmation emails via `EmailTemplate`.

Phase 5 — trust & ops:
- reCAPTCHA verification wired into `/auth/register` and `/auth/login`.
- S3 upload signing endpoint for product images and chat attachments.
- Automated backups + admin-triggered restore flow.
- Email templates for order confirmation, shipping updates, vendor
  approval/rejection, withdrawal processed.

Each phase is additive — nothing in Phase 1 needs to change to build the
rest.
