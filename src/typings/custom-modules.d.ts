import { User } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      auth?: {
        user: Omit<User, 'password'>
        accessToken: string
      }
    }
  }
}
