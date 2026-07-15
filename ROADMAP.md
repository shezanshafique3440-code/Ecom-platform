# API Reference

Base URL: `/api`. All bodies are JSON. Authenticated routes expect
`Authorization: Bearer <accessToken>`.

## Auth
| Method | Path | Description |
|---|---|---|
| POST | `/auth/register` | Create a customer account |
| POST | `/auth/login` | Login (accepts `totpCode` if 2FA enabled) |
| POST | `/auth/refresh` | Rotate refresh token → new access token |
| POST | `/auth/logout` | Clear refresh token cookie |
| POST | `/auth/2fa/enable` | Generate TOTP secret + QR otpauth URL |
| POST | `/auth/2fa/confirm` | Verify code, activate 2FA |

## Catalog
| Method | Path | Description |
|---|---|---|
| GET | `/products?q=&category=&minPrice=&maxPrice=&sort=&page=` | Search/filter/sort |
| GET | `/products/autocomplete?q=` | Typeahead suggestions |
| GET | `/products/:slug` | Product detail |
| POST | `/products` | Create product (vendor) |
| PATCH | `/products/:id` | Update product (vendor/admin) |
| DELETE | `/products/:id` | Delete product (vendor/admin) |

## Cart / Wishlist
| Method | Path | Description |
|---|---|---|
| GET/POST | `/cart` | View / add to cart |
| PATCH/DELETE | `/cart/:productId` | Update quantity / remove |
| GET/POST/DELETE | `/wishlist`, `/wishlist/:productId` | Wishlist CRUD |

## Orders
| Method | Path | Description |
|---|---|---|
| POST | `/orders/checkout` | Place order (splits by vendor, applies coupon) |
| GET | `/orders` | Customer's order history |
| GET | `/orders/:id/tracking` | Tracking timeline |
| GET | `/orders/vendor/mine` | Vendor's order groups |
| PATCH | `/orders/vendor/:orderId/status` | Update fulfillment status |

## Vendors
| Method | Path | Description |
|---|---|---|
| POST | `/vendors/apply` | Submit vendor application |
| GET | `/vendors/dashboard/summary` | Sales/earnings analytics |
| POST/GET | `/vendors/withdrawals` | Request / list withdrawals |
| GET | `/vendors?status=` | (admin) List vendor applications |
| PATCH | `/vendors/:id/status` | (admin) Approve/reject/suspend |

## Reviews & Coupons
| Method | Path | Description |
|---|---|---|
| POST | `/reviews` | Leave a review (verified purchase only) |
| GET | `/reviews/product/:productId` | List reviews |
| POST | `/coupons/validate` | Check a coupon against a subtotal |
| POST | `/coupons` | Create a coupon (vendor/admin) |

## Payments

Checkout (`POST /orders/checkout`) creates the `Order` + a `Payment` row in
`PENDING` status. The client then calls the matching endpoint below based
on the chosen method to actually collect funds.

| Method | Path | Description |
|---|---|---|
| POST | `/payments/stripe/intent` | `{ orderId }` → `{ clientSecret }` for Stripe Elements/Payment Element |
| POST | `/payments/paypal/create` | `{ orderId }` → `{ paypalOrderId, approvalUrl }`, redirect the customer to `approvalUrl` |
| POST | `/payments/paypal/capture` | `{ paypalOrderId }` → captures funds after customer approval |
| POST | `/payments/crypto/charge` | `{ orderId }` → `{ chargeId, hostedUrl }` (Coinbase Commerce) |
| GET | `/payments/bank-transfer/:orderId` | Returns beneficiary details + reference number to display |

Webhooks (no auth — verified by signature instead), mounted at
`/payments/webhooks/*` with raw-body parsing:

| Path | Gateway | Verifies |
|---|---|---|
| `/payments/webhooks/stripe` | Stripe | `stripe-signature` header via `STRIPE_WEBHOOK_SECRET` |
| `/payments/webhooks/coinbase` | Coinbase Commerce | `x-cc-webhook-signature` via `COINBASE_COMMERCE_WEBHOOK_SECRET` |
| `/payments/webhooks/paypal` | PayPal | stubbed — see `docs/ROADMAP.md` |

On success (`payment_intent.succeeded`, `charge:confirmed`, or a completed
PayPal capture), the order transitions `Payment.status → PAID` and
`Order.status → CONFIRMED` atomically, with a tracking event recorded.

## Admin
| Method | Path | Description |
|---|---|---|
| GET | `/admin/analytics/overview` | Platform KPIs |
| GET/PATCH | `/admin/users`, `/admin/users/:id/status` | User management |
| GET/POST | `/admin/categories` | Category tree |
| GET/POST | `/admin/banners` | Homepage banners |
| POST | `/admin/cms` | Upsert a CMS page |
| GET | `/admin/security-logs` | Auth/security event log |
| GET | `/admin/payments` | Payment oversight |

## Support
| Method | Path | Description |
|---|---|---|
| POST/GET | `/support/tickets`, `/support/tickets/mine` | Customer ticket CRUD |
| GET/POST | `/support/tickets/:id/messages` | Ticket message thread |
| GET | `/support/agent/queue` | Agent dashboard queue |
| PATCH | `/support/tickets/:id/claim` \| `/resolve` | Agent workflow |

Real-time chat delivery: `wss://<host>/ws/chat?token=<accessToken>`.
