import { Session } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

export const GetSessionByUserRepository = async (userId: string): Promise<Session> => {
  const result = await Prisma.session.findMany({
    where: {
      userId
    }
  })

  return result[0]
}

export default GetSessionByUserRepository
