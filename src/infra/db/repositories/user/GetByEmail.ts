import { User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

type GetByEmail = (email: string) => Promise<User>

export const GetByEmailRepository: GetByEmail = async (email: string): Promise<User> => {
  const data = await Prisma.user.findUnique({
    where: {
      email
    }
  })

  return data
}
