import Joi from 'joi'

import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { GetSessionAndUserByTokenRepository } from '@/infra/db/repositories/session/'

export class GetSessionAndUserController implements Controller {
  async handle(request: GetSessionAndUserController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = GetSessionAndUserSchema.validate(request)

      if (error) {
        return badRequest(error)
      }

      const { sessionToken }: GetSessionAndUserController.Request = value

      const user = await GetSessionAndUserByTokenRepository(sessionToken)

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetSessionAndUserController {
  export type Request = {
    sessionToken: string
  }
}

const GetSessionAndUserSchema = Joi.object({
  sessionToken: Joi.string().required()
})
