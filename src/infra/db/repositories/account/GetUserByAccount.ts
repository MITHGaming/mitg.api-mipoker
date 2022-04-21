import { User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

export const GetUserByAccountRepository = async ({
  provider,
  providerAccountId
}: {
  provider: string
  providerAccountId: string
}): Promise<User | null> => {
  const result = await Prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId
      }
    },
    include: {
      user: true
    }
  })

  return result?.user || null
}

export default GetUserByAccountRepository
