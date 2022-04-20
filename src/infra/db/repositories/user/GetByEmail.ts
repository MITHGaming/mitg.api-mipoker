import { User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

export const GetByEmailRepository = async (email: string): Promise<Omit<User, 'password'>> => {
  const data = await Prisma.user.findUnique({
    where: {
      email
    }
  })

  if (data) {
    const { password, ...user } = data

    return user
  }

  return data
}

export default GetByEmailRepository
