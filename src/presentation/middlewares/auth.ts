import { GetByEmailWithRoleRepository } from '@/infra/db/repositories/user'
import { verify } from '@/infra/jwt'
import { Middleware, HttpResponse } from '@/presentation/protocols'
import { TokenNotProvidedError, UnauthorizedError, UserNotFoundError } from '@/presentation/errors'
import { badRequest, serverError, ok } from '@/presentation/helper'

export class AuthMiddleware implements Middleware {
  constructor(private readonly routeRole: { id: number }) {}

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

      if (!(user.role.id === this.routeRole.id) && !(user.role.id >= this.routeRole.id)) {
        return badRequest(new UnauthorizedError())
      }

      return ok({ user, accessToken })
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
