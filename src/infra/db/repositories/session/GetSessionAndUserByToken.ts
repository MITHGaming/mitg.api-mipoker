import { Session, User } from '@prisma/client'
import Prisma from '../../prisma'

interface SessionAndUser {
  session: Session
  user: User
}

export const GetSessionAndUserByTokenRepository = async (
  sessionToken: string
): Promise<SessionAndUser> => {
  const result = await Prisma.session.findUnique({
    where: {
      sessionToken
    },
    include: {
      user: true
    }
  })

  return result?.user ? { session: result, user: result.user } : null
}
