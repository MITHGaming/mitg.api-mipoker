import Joi from 'joi'

import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { CreateSessionRepository } from '@/infra/db/repositories/session'

export class CreateSessionController implements Controller {
  async handle(request: CreateSessionController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = CreateSessionSchema.validate(request)
      const { ...data }: CreateSessionController.Request = value

      if (error) {
        return badRequest(error)
      }

      const user = await CreateSessionRepository(data)

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateSessionController {
  export type Request = {
    sessionToken: string
    userId: string
    expires: any
  }
}

const CreateSessionSchema = Joi.object({
  sessionToken: Joi.string().required(),
  userId: Joi.string().required(),
  expires: Joi.required()
})
