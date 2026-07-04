import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import bcrypt from 'bcryptjs'

const adapter = new PrismaBetterSqlite3({ url: 'file:./prisma/dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10)
    const user = await prisma.user.upsert({
      where: { email: 'student@badar.ai' },
      update: {
        password: hashedPassword
      },
      create: {
        email: 'student@badar.ai',
        name: 'Mahasiswa Badar',
        password: hashedPassword,
        role: 'student',
      },
    })
    console.log('Seed successful! Created/Updated user:', user.email)
  } catch (error) {
    console.error('Seed error:', error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
