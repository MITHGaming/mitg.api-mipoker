import jwt from 'jsonwebtoken'
import env from '@/environment'
import { TokenError, TokenExpireError, TokenMalformedError } from '@/presentation/errors'

export const verify = async (token: string): Promise<any> => {
  const secret = env.JWT.SECRET
  const response = await jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          return new TokenExpireError()
        case 'JsonWebTokenError':
          return new TokenMalformedError()
        default:
          return new TokenError()
      }
    }

    return decoded
  })

  return response
}
