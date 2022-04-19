import Joi from 'joi'
import { UserNotFoundError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { GetByAccountRepository } from '@/infra/db/repositories/user'

export class GetUserByAccountController implements Controller {
  async handle(request: GetUserByAccountController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = GetUserByAccountSchema.validate(request)

      if (error) {
        return badRequest(error)
      }

      const data = await GetByAccountRepository(value)

      if (!data) {
        return badRequest(new UserNotFoundError())
      }

      return ok(data)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetUserByAccountController {
  export type Request = {
    provider_providerAccountId: any
  }
}

const GetUserByAccountSchema = Joi.object({
  provider_providerAccountId: Joi.required()
})
