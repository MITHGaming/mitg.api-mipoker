import jwt from 'jsonwebtoken'
import env from '@/environment'

export const sign = async (payload: any): Promise<string> => {
  const secret = env.JWT.SECRET
  const token = await jwt.sign(payload, secret, {
    expiresIn: '7d'
  })

  return token
}
