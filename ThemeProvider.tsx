// Haat — Prisma schema (PostgreSQL)
// Covers: users/auth, vendors, catalog, cart/wishlist, orders/payments,
// coupons, reviews, support/chat, CMS, admin/RBAC, security & notifications.

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ---------- Auth / Users ----------

enum UserRole {
  CUSTOMER
  VENDOR
  ADMIN
  SUPPORT_AGENT
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  PENDING_VERIFICATION
}

model User {
  id                String     @id @default(uuid())
  email             String     @unique
  passwordHash      String
  fullName          String
  phone             String?
  role              UserRole   @default(CUSTOMER)
  status            UserStatus @default(PENDING_VERIFICATION)
  emailVerifiedAt   DateTime?
  twoFactorEnabled  Boolean    @default(false)
  twoFactorSecret   String?
  preferredLocale   String     @default("en")
  preferredCurrency String     @default("USD")
  avatarUrl         String?
  createdAt         DateTime   @default(now())
  updatedAt         DateTime   @updatedAt

  vendor            Vendor?
  addresses         Address[]
  cart              CartItem[]
  wishlist          WishlistItem[]
  orders            Order[]
  reviews           Review[]
  tickets           SupportTicket[]  @relation("TicketCustomer")
  agentTickets      SupportTicket[]  @relation("TicketAgent")
  chatMessages      ChatMessage[]
  notifications     Notification[]
  securityLogs      SecurityLog[]
  refreshTokens     RefreshToken[]
  permissions       UserPermission[]

  @@index([role, status])
}

model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
  revoked   Boolean  @default(false)
}

model Address {
  id         String  @id @default(uuid())
  userId     String
  user       User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  label      String
  line1      String
  line2      String?
  city       String
  state      String?
  postalCode String
  country    String
  isDefault  Boolean @default(false)
}

// ---------- Vendors ----------

enum VendorStatus {
  PENDING
  APPROVED
  REJECTED
  SUSPENDED
}

model Vendor {
  id            String       @id @default(uuid())
  userId        String       @unique
  user          User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  storeName     String
  storeSlug     String       @unique
  storeLogoUrl  String?
  storeBanner   String?
  description   String?
  status        VendorStatus @default(PENDING)
  commissionPct Decimal      @default(10.0) @db.Decimal(5, 2)
  payoutMethod  String?
  createdAt     DateTime     @default(now())
  approvedAt    DateTime?

  products      Product[]
  orders        OrderVendorGroup[]
  withdrawals   WithdrawalRequest[]
  coupons       Coupon[]

  @@index([status])
}

model WithdrawalRequest {
  id         String   @id @default(uuid())
  vendorId   String
  vendor     Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  amount     Decimal  @db.Decimal(12, 2)
  status     String   @default("PENDING") // PENDING | APPROVED | REJECTED | PAID
  method     String
  requestedAt DateTime @default(now())
  processedAt DateTime?
  notes      String?
}

// ---------- Catalog ----------

model Category {
  id       String     @id @default(uuid())
  name     String
  slug     String     @unique
  imageUrl String?
  parentId String?
  parent   Category?  @relation("CategoryTree", fields: [parentId], references: [id])
  children Category[] @relation("CategoryTree")
  products Product[]
}

model Product {
  id           String        @id @default(uuid())
  vendorId     String
  vendor       Vendor        @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  categoryId   String
  category     Category      @relation(fields: [categoryId], references: [id])
  title        String
  slug         String        @unique
  description  String
  basePrice    Decimal       @db.Decimal(12, 2)
  currency     String        @default("USD")
  stock        Int           @default(0)
  sku          String        @unique
  images       String[]
  status       String        @default("DRAFT") // DRAFT | PUBLISHED | ARCHIVED
  isFlashDeal  Boolean       @default(false)
  dealPrice    Decimal?      @db.Decimal(12, 2)
  dealEndsAt   DateTime?
  avgRating    Decimal       @default(0) @db.Decimal(3, 2)
  reviewCount  Int           @default(0)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  variants     ProductVariant[]
  reviews      Review[]
  cartItems    CartItem[]
  wishlistedBy WishlistItem[]
  orderItems   OrderItem[]

  @@index([categoryId, status])
  @@index([vendorId])
}

model ProductVariant {
  id        String  @id @default(uuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  name      String  // e.g. "Size / Color"
  sku       String  @unique
  priceDiff Decimal @default(0) @db.Decimal(12, 2)
  stock     Int     @default(0)
}

// ---------- Cart / Wishlist ----------

model CartItem {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  quantity  Int      @default(1)
  createdAt DateTime @default(now())

  @@unique([userId, productId])
}

model WishlistItem {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, productId])
}

// ---------- Orders / Payments ----------

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

model Order {
  id             String      @id @default(uuid())
  orderNumber    String      @unique
  userId         String
  user           User        @relation(fields: [userId], references: [id])
  status         OrderStatus @default(PENDING)
  subtotal       Decimal     @db.Decimal(12, 2)
  discountTotal  Decimal     @default(0) @db.Decimal(12, 2)
  shippingTotal  Decimal     @default(0) @db.Decimal(12, 2)
  grandTotal     Decimal     @db.Decimal(12, 2)
  currency       String      @default("USD")
  couponCode     String?
  shippingAddressId String?
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt

  items          OrderItem[]
  vendorGroups   OrderVendorGroup[]
  payment        Payment?
  trackingEvents OrderTrackingEvent[]
}

// Each order can span multiple vendors; this groups line items per vendor
// for payout/commission accounting and vendor-side order management.
model OrderVendorGroup {
  id        String   @id @default(uuid())
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  vendorId  String
  vendor    Vendor   @relation(fields: [vendorId], references: [id])
  subtotal  Decimal  @db.Decimal(12, 2)
  commission Decimal @db.Decimal(12, 2)
  payout    Decimal  @db.Decimal(12, 2)
  status    OrderStatus @default(PENDING)
}

model OrderItem {
  id        String  @id @default(uuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product @relation(fields: [productId], references: [id])
  vendorId  String
  quantity  Int
  unitPrice Decimal @db.Decimal(12, 2)
  lineTotal Decimal @db.Decimal(12, 2)
}

model OrderTrackingEvent {
  id        String   @id @default(uuid())
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  status    OrderStatus
  note      String?
  createdAt DateTime @default(now())
}

enum PaymentMethod {
  STRIPE
  PAYPAL
  BANK_TRANSFER
  CRYPTO
  COD
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

model Payment {
  id            String        @id @default(uuid())
  orderId       String        @unique
  order         Order         @relation(fields: [orderId], references: [id], onDelete: Cascade)
  method        PaymentMethod
  status        PaymentStatus @default(PENDING)
  amount        Decimal       @db.Decimal(12, 2)
  currency      String        @default("USD")
  providerRef   String?       // Stripe/PayPal charge id, tx hash, etc.
  createdAt     DateTime      @default(now())
}

// ---------- Coupons ----------

model Coupon {
  id           String   @id @default(uuid())
  code         String   @unique
  vendorId     String?
  vendor       Vendor?  @relation(fields: [vendorId], references: [id])
  type         String   // PERCENT | FIXED
  value        Decimal  @db.Decimal(12, 2)
  minSpend     Decimal? @db.Decimal(12, 2)
  usageLimit   Int?
  usedCount    Int      @default(0)
  startsAt     DateTime?
  expiresAt    DateTime?
  active       Boolean  @default(true)
}

// ---------- Reviews ----------

model Review {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  rating    Int
  title     String?
  body      String?
  createdAt DateTime @default(now())

  @@unique([productId, userId])
}

// ---------- Support / Live Chat ----------

model SupportTicket {
  id         String   @id @default(uuid())
  subject    String
  customerId String
  customer   User     @relation("TicketCustomer", fields: [customerId], references: [id])
  agentId    String?
  agent      User?    @relation("TicketAgent", fields: [agentId], references: [id])
  status     String   @default("OPEN") // OPEN | IN_PROGRESS | RESOLVED | CLOSED
  createdAt  DateTime @default(now())
  messages   ChatMessage[]
}

model ChatMessage {
  id         String        @id @default(uuid())
  ticketId   String
  ticket     SupportTicket @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  senderId   String
  sender     User          @relation(fields: [senderId], references: [id])
  body       String?
  attachmentUrl String?
  createdAt  DateTime      @default(now())
}

// ---------- CMS / Banners ----------

model CmsPage {
  id        String   @id @default(uuid())
  slug      String   @unique
  title     String
  content   String
  updatedAt DateTime @updatedAt
}

model Banner {
  id        String   @id @default(uuid())
  title     String
  imageUrl  String
  linkUrl   String?
  position  String   @default("HOME_HERO")
  active    Boolean  @default(true)
  startsAt  DateTime?
  endsAt    DateTime?
}

model EmailTemplate {
  id        String   @id @default(uuid())
  key       String   @unique // e.g. ORDER_CONFIRMATION, VENDOR_APPROVED
  subject   String
  bodyHtml  String
  updatedAt DateTime @updatedAt
}

// ---------- RBAC / Security / Notifications ----------

model Permission {
  id    String @id @default(uuid())
  key   String @unique // e.g. "products.manage", "orders.refund"
  label String
  users UserPermission[]
}

model UserPermission {
  id           String     @id @default(uuid())
  userId       String
  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  permissionId String
  permission   Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)

  @@unique([userId, permissionId])
}

model SecurityLog {
  id        String   @id @default(uuid())
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
  event     String   // LOGIN_SUCCESS | LOGIN_FAIL | PASSWORD_RESET | 2FA_ENABLED | ...
  ipAddress String?
  userAgent String?
  metadata  Json?
  createdAt DateTime @default(now())

  @@index([event, createdAt])
}

model Notification {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  type      String
  title     String
  body      String?
  readAt    DateTime?
  createdAt DateTime @default(now())
}
