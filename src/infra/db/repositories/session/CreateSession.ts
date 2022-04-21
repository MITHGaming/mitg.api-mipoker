import { Session } from '@prisma/client'
import Prisma from '@/infra/db/prisma'

export const CreateSessionRepository = async (data: Omit<Session, 'id'>): Promise<Session> => {
  const result = await Prisma.session.create({
    data
  })

  return result
}

export default CreateSessionRepository
