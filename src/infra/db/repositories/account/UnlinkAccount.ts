import { Account } from '@prisma/client'
import Prisma from '../../prisma'

export const DeleteAccountRepository = async (
  provider: string,
  providerAccountId: string
): Promise<Account> => {
  const result = await Prisma.account.delete({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId
      }
    }
  })

  return result
}
