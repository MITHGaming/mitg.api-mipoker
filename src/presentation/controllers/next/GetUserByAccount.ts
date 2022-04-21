import Joi from 'joi'

import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { GetUserByAccountRepository } from '@/infra/db/repositories/account'

export class GetUserByAccountController implements Controller {
  async handle(request: GetUserByAccountController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = GetUserByAccountSchema.validate(request)

      if (error) {
        return badRequest(error)
      }

      const { provider, providerAccountId }: GetUserByAccountController.Request = value

      const user = await GetUserByAccountRepository({ provider, providerAccountId })

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetUserByAccountController {
  export type Request = {
    provider: string
    providerAccountId: string
  }
}

const GetUserByAccountSchema = Joi.object({
  provider: Joi.string().required(),
  providerAccountId: Joi.string().required()
})
