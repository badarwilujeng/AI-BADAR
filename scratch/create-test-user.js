
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const bcrypt = require('bcryptjs');

async function main() {
  const adapter = new PrismaBetterSqlite3({ url: 'file:./prisma/dev.db' });
  const prisma = new PrismaClient({ adapter });

  const studentId = '12345';
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { studentId: studentId },
    update: {
        password: hashedPassword,
    },
    create: {
      studentId: studentId,
      name: 'Test Student',
      email: 'test@student.com',
      password: hashedPassword,
      role: 'student',
    },
  });

  console.log('User created/updated:', user);

  await prisma.$disconnect();
}

main().catch(console.error);
