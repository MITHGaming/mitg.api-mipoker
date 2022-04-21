import Joi from 'joi'

import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { DeleteUserRepository } from '@/infra/db/repositories/user'

export class DeleteUserController implements Controller {
  async handle(request: DeleteUserController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = DeleteUserSchema.validate(request)

      if (error) {
        return badRequest(error)
      }

      const { id }: DeleteUserController.Request = value

      const user = await DeleteUserRepository(id)

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteUserController {
  export type Request = {
    id: string
  }
}

const DeleteUserSchema = Joi.object({
  id: Joi.string().required()
})
