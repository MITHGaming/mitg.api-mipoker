import Joi from 'joi'

import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { CreateVerificationTokenRepository } from '@/infra/db/repositories/verificationToken'

export class CreateVerificationTokenController implements Controller {
  async handle(request: CreateVerificationTokenController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = CreateVerificationTokenSchema.validate(request)

      if (error) {
        return badRequest(error)
      }

      const data: CreateVerificationTokenController.Request = value

      const user = await CreateVerificationTokenRepository(data)

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateVerificationTokenController {
  export type Request = {
    identifier: string
    expires: any
    token: string
  }
}

const CreateVerificationTokenSchema = Joi.object({
  identifier: Joi.string().required(),
  token: Joi.string().required(),
  expires: Joi.required()
})
