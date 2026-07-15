import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('ChangeMe123!', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'owner@haat.example',
      passwordHash,
      fullName: 'Platform Owner',
      role: 'ADMIN',
      status: 'ACTIVE',
      emailVerifiedAt: new Date(),
    },
  });

  const vendorUser = await prisma.user.create({
    data: {
      email: 'vendor@haat.example',
      passwordHash,
      fullName: 'Sample Vendor',
      role: 'VENDOR',
      status: 'ACTIVE',
      emailVerifiedAt: new Date(),
    },
  });

  const vendor = await prisma.vendor.create({
    data: {
      userId: vendorUser.id,
      storeName: 'Indus Crafts Co.',
      storeSlug: 'indus-crafts-co',
      description: 'Handmade goods from independent artisans.',
      status: 'APPROVED',
      approvedAt: new Date(),
    },
  });

  const category = await prisma.category.create({
    data: { name: 'Home & Living', slug: 'home-living' },
  });

  await prisma.product.create({
    data: {
      vendorId: vendor.id,
      categoryId: category.id,
      title: 'Hand-loomed Wool Throw',
      slug: 'hand-loomed-wool-throw',
      description: 'A warm, hand-loomed throw blanket woven by artisans.',
      basePrice: 89.0,
      stock: 40,
      sku: 'ICC-THROW-001',
      images: [],
      status: 'PUBLISHED',
      isFlashDeal: true,
      dealPrice: 69.0,
    },
  });

  console.log('Seed complete. Admin login: owner@haat.example / ChangeMe123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
