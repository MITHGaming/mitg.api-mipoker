import { Role, User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

interface UserWithRole extends User {
  role: Role
}

export const GetUserByAccountRepository = async ({
  provider,
  providerAccountId
}: {
  provider: string
  providerAccountId: string
}): Promise<UserWithRole | null> => {
  const result = await Prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId
      }
    },
    include: {
      user: {
        include: {
          role: true
        }
      }
    }
  })

  return result?.user || null
}

export default GetUserByAccountRepository
