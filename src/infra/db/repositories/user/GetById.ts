import { User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

export const GetByIdRepository = async (id: string): Promise<Omit<User, 'password'>> => {
  const data = await Prisma.user.findUnique({
    where: {
      id
    }
  })

  if (data) {
    const { password, ...user } = data

    return user
  }

  return data
}

export default GetByIdRepository
