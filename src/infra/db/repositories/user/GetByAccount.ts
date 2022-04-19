import { User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

export const GetByAccountRepository = async (provider_providerAccountId: any): Promise<User> => {
  const result = await Prisma.account.findUnique({
    where: {
      provider_providerAccountId
    },
    select: {
      user: true
    }
  })

  return result?.user ?? null
}

export default GetByAccountRepository
