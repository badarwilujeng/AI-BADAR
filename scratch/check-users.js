
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

async function main() {
  const adapter = new PrismaBetterSqlite3({ url: 'file:./prisma/dev.db' });
  const prisma = new PrismaClient({ adapter });

  const users = await prisma.user.findMany();
  console.log('Users in DB:', JSON.stringify(users, null, 2));

  await prisma.$disconnect();
}

main().catch(console.error);
