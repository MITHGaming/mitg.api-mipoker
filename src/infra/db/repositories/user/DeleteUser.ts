import { User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

export const DeleteUserRepository = async (id: string): Promise<Omit<User, 'password'>> => {
  const result = await Prisma.user.delete({
    where: {
      id
    }
  })

  return result
}

export default DeleteUserRepository
