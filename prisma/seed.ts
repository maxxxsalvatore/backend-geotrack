import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Buat Departemen Utama
  const operationalDept = await prisma.department.upsert({
    where: { code: 'OPS' },
    update: {},
    create: {
      name: 'Operations',
      code: 'OPS',
    },
  });

  const fieldDept = await prisma.department.upsert({
    where: { code: 'FLD' },
    update: {},
    create: {
      name: 'Field Tracker',
      code: 'FLD',
    },
  });

  console.log('✅ Departments created/verified.');

  // 2. Buat Super Admin Pertama
  const hashedPassword = await argon2.hash('Admin123!');
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@geotrack.com' },
    update: {},
    create: {
      email: 'admin@geotrack.com',
      passwordHash: hashedPassword,
      fullName: 'Super Administrator',
      departmentId: operationalDept.id,
      isActive: true,
    },
  });

  console.log(`✅ Admin User created: ${adminUser.email} (Password: Admin123!)`);

  // 3. Buat Kode Akses Lapangan (Access Code)
  const accessCode = await prisma.divisionAccessCode.upsert({
    where: { code: 'FIELD-OPS-01' },
    update: {},
    create: {
      code: 'FIELD-OPS-01',
      roleName: 'Field Team Alpha',
      departmentId: fieldDept.id,
      isActive: true,
    },
  });

  console.log(`✅ Access Code created: ${accessCode.code}`);
  console.log('🚀 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });