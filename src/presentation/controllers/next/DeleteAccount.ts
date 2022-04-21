import Joi from 'joi'

import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { DeleteAccountRepository } from '@/infra/db/repositories/account/UnlinkAccount'

export class DeleteAccountController implements Controller {
  async handle(request: DeleteAccountController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = DeleteAccountSchema.validate(request)

      if (error) {
        return badRequest(error)
      }

      const { provider, providerAccountId }: DeleteAccountController.Request = value

      const user = await DeleteAccountRepository(provider, providerAccountId)

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteAccountController {
  export type Request = {
    provider: string
    providerAccountId: string
  }
}

const DeleteAccountSchema = Joi.object({
  provider: Joi.string().required(),
  providerAccountId: Joi.string().required()
})
