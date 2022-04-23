import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const roles = [{ name: 'user' }, { name: 'moderator' }, { name: 'admin' }]

export const main = async (): Promise<void> => {
  for (const role of roles) {
    await prisma.role.create({ data: role })
  }
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
