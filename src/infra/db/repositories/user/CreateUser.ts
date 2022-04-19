import { User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

type CreateUser = (data: User) => Promise<User>

export const CreateUserRepository: CreateUser = async (data: User): Promise<User> => {
  const result = await Prisma.user.create({
    data
  })

  return result
}

export default CreateUserRepository
