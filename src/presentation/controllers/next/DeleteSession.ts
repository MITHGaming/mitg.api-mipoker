import Joi from 'joi'

import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { DeleteSessionRepository } from '@/infra/db/repositories/session'

export class DeleteSessionController implements Controller {
  async handle(request: DeleteSessionController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = DeleteSessionSchema.validate(request)

      if (error) {
        return badRequest(error)
      }

      const { sessionToken }: DeleteSessionController.Request = value

      const session = await DeleteSessionRepository(sessionToken)

      return ok(session)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteSessionController {
  export type Request = {
    sessionToken: string
  }
}

const DeleteSessionSchema = Joi.object({
  sessionToken: Joi.string().required()
})
