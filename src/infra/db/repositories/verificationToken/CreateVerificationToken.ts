import { VerificationToken } from '@prisma/client'
import Prisma from '../../prisma'

export const CreateVerificationTokenRepository = async (
  data: VerificationToken
): Promise<VerificationToken> => {
  const result = await Prisma.verificationToken.create({
    data
  })

  return result
}
