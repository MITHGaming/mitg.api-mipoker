import { User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

export const GetByEmailWithPasswordRepository = async (email: string): Promise<User> => {
  const data = await Prisma.user.findUnique({
    where: {
      email
    }
  })

  return data
}

export default GetByEmailWithPasswordRepository
