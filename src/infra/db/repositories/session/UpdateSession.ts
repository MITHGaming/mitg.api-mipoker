import { Session } from '@prisma/client'
import Prisma from '../../prisma'

export const UpdateSessionRepository = async (
  sessionToken: string,
  data: Omit<Session, 'id'>
): Promise<Session> => {
  const result = await Prisma.session.update({
    where: {
      sessionToken
    },
    data: {
      ...data
    }
  })

  return result
}
