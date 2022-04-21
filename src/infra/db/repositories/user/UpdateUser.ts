import { User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

export const UpdateUserRepository = async (
  id: string,
  data: Omit<User, 'id' | 'password' | 'username'>
): Promise<Omit<User, 'password'>> => {
  const result = await Prisma.user.update({
    where: {
      id
    },
    data: {
      ...data
    }
  })

  return result
}

export default UpdateUserRepository
