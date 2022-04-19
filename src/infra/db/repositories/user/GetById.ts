import { User } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

type GetById = (id: string) => Promise<User>

export const GetByIdRepository: GetById = async (id: string): Promise<User> => {
  const data = await Prisma.user.findUnique({
    where: {
      id
    }
  })

  return data
}

export default GetByIdRepository
