import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create or upsert Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@helpdesk.com' },
    update: {},
    create: {
      name: 'System Admin',
      email: 'admin@helpdesk.com',
      role: 'ADMIN',
    },
  });

  // 2. Create or upsert Agent User
  const agent = await prisma.user.upsert({
    where: { email: 'agent@helpdesk.com' },
    update: {},
    create: {
      name: 'Support Agent',
      email: 'agent@helpdesk.com',
      role: 'AGENT',
    },
  });

  // 3. Create Sample Ticket
  await prisma.ticket.create({
    data: {
      subject: 'Server connection timeout',
      description: 'Unable to connect to production database cluster.',
      status: 'OPEN',
      priority: 'HIGH',
      userId: admin.id,
    },
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

