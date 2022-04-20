import jwt from 'jsonwebtoken'
import env from '@/environment'

type SignProps = {
  id: string
}

export const sign = async ({ id }: SignProps): Promise<string> => {
  const secret = env.JWT.SECRET
  const token = await jwt.sign({ id }, secret, {
    expiresIn: '7d'
  })

  return token
}
