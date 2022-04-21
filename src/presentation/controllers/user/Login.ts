import { comparePassword } from '@/infra/bcrypt/compare'
import {
  CreateSessionRepository,
  DeleteSessionRepository,
  GetSessionByUserRepository
} from '@/infra/db/repositories/session'
import { GetByEmailWithPasswordRepository } from '@/infra/db/repositories/user'
import { decode, sign, verify } from '@/infra/jwt'
import { EmailNotFoundError, LoginInvalidError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import Joi from 'joi'

export class LoginController implements Controller {
  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = LoginSchema.validate(request)
      const data: LoginController.Request = value

      if (error) {
        return badRequest(error)
      }

      const user = await GetByEmailWithPasswordRepository(data.email)

      if (!user) {
        return badRequest(new EmailNotFoundError())
      }

      const passwordIsValid = await comparePassword(data.password, user.password)

      if (!passwordIsValid) {
        return badRequest(new LoginInvalidError())
      }

      const userHasSession = await GetSessionByUserRepository(user.id)

      if (userHasSession) {
        const isValidToken = await verify(userHasSession.sessionToken)

        if (isValidToken instanceof Error) {
          await DeleteSessionRepository(userHasSession.sessionToken)
        } else if (isValidToken) {
          return ok({ session: userHasSession })
        }
      }

      const token = await sign({ id: user.id })
      const decoded = await decode(token)

      const session = await CreateSessionRepository({
        expires: new Date(decoded.payload.exp * 1000),
        userId: user.id,
        sessionToken: token
      })

      return ok({ session: session })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}

const LoginSchema = Joi.object({
  email: Joi.string().email().max(120).min(3).required(),
  password: Joi.string().min(3).max(255).required()
})
