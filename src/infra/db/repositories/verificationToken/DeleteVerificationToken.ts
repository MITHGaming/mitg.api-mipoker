import { Prisma as PrismaPkg, VerificationToken } from '@prisma/client'
import Prisma from '../../prisma'

export const DeleteVerificationTokenRepository = async (
  token: string
): Promise<VerificationToken | null> => {
  try {
    const result = await Prisma.verificationToken.delete({
      where: {
        token
      }
    })

    return result
  } catch (error) {
    if ((error as PrismaPkg.PrismaClientKnownRequestError).code === 'P2025') return null

    throw error
  }
}
