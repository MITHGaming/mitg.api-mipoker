import { GetByEmailWithRoleRepository } from '@/infra/db/repositories/user'
import { verify } from '@/infra/jwt'
import { Middleware, HttpResponse } from '@/presentation/protocols'
import { TokenNotProvidedError, UnauthorizedError, UserNotFoundError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helper'

export class AuthMiddleware implements Middleware {
  constructor(private readonly role: 'user' | 'moderator' | 'admin') {}

  async handle({ accessToken }: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      if (!accessToken) {
        return badRequest(new TokenNotProvidedError())
      }

      const decodedToken = await verify(accessToken)

      if (decodedToken instanceof Error) {
        return badRequest(decodedToken)
      }

      const { email } = decodedToken

      const user = await GetByEmailWithRoleRepository(email)

      if (!user) {
        return badRequest(new UserNotFoundError())
      }

      if (this.role !== user.role.name) {
        return badRequest(new UnauthorizedError())
      }

      return {
        statusCode: 200,
        body: {
          user,
          accessToken
        }
      }
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
