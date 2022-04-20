import jwt from 'jsonwebtoken'
import env from '@/environment'

export const verify = async (token: string): Promise<any> => {
  const secret = env.JWT.SECRET
  const response = await jwt.verify(token, secret, (err) => {
    if (err) {
      return err
    }
  })

  return response
}
