import Joi from 'joi'

import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { UpdateSessionRepository } from '@/infra/db/repositories/session/UpdateSession'

export class UpdateSessionController implements Controller {
  async handle(request: UpdateSessionController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = UpdateSessionSchema.validate(request)
      const { ...data }: UpdateSessionController.Request = value

      if (error) {
        return badRequest(error)
      }

      const session = await UpdateSessionRepository(data.sessionToken, data)

      return ok(session)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateSessionController {
  export type Request = {
    sessionToken: string
    userId: string
    expires: any
  }
}

const UpdateSessionSchema = Joi.object({
  sessionToken: Joi.string().required(),
  userId: Joi.string().required(),
  expires: Joi.required()
})
