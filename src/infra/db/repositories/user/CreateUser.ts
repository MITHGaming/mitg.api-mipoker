import { User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

export const CreateUserRepository = async (data: User): Promise<Omit<User, 'password'>> => {
  const result = await Prisma.user.create({
    data
  })

  const { password, ...user } = result

  return user
}

export default CreateUserRepository
