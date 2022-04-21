import { Session } from '@prisma/client'
import Prisma from '../../prisma'

export const DeleteSessionRepository = async (sessionToken: string): Promise<Session> => {
  const result = await Prisma.session.delete({
    where: {
      sessionToken
    }
  })

  return result
}
