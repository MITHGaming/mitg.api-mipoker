import { Account } from '@prisma/client'
import Prisma from '../../prisma'

export const CreateAccountRepository = async (account: any): Promise<Account> => {
  const result = await Prisma.account.create({
    data: {
      ...account
    }
  })

  return result
}
