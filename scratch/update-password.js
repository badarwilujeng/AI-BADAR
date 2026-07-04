const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const bcrypt = require('bcryptjs');

async function main() {
  const adapter = new PrismaBetterSqlite3({ url: 'file:./prisma/dev.db' });
  const prisma = new PrismaClient({ adapter });

  const hashedPassword = await bcrypt.hash('badar123', 12);

  await prisma.user.update({
    where: { studentId: '101230083' },
    data: { password: hashedPassword }
  });

  console.log('Password updated successfully for NIM 101230083 to "badar123"');
  await prisma.$disconnect();
}

main().catch(console.error);
