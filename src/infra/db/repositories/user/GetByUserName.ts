import { User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

export const GetByUsernameRepository = async (
  username: string
): Promise<Omit<User, 'password'>> => {
  const data = await Prisma.user.findUnique({
    where: {
      username
    }
  })

  if (data) {
    const { password, ...user } = data

    return user
  }

  return data
}

export default GetByUsernameRepository
