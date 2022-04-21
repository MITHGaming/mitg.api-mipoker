import Joi from 'joi'

import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { DeleteVerificationTokenRepository } from '@/infra/db/repositories/verificationToken'

export class UseVerificationTokenController implements Controller {
  async handle(request: UseVerificationTokenController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = UseVerificationTokenSchema.validate(request)

      if (error) {
        return badRequest(error)
      }

      const { token }: UseVerificationTokenController.Request = value

      const verificationToken = await DeleteVerificationTokenRepository(token)

      return ok(verificationToken)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UseVerificationTokenController {
  export type Request = {
    token: string
  }
}

const UseVerificationTokenSchema = Joi.object({
  token: Joi.string().required()
})
