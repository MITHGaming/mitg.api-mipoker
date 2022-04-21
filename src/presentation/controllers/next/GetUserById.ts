import Joi from 'joi'

import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { GetByIdRepository } from '@/infra/db/repositories/user'

export class GetUserByIdController implements Controller {
  async handle(request: GetUserByIdController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = GetUserByIdSchema.validate(request)
      const data: GetUserByIdController.Request = value

      if (error) {
        return badRequest(error)
      }

      const user = await GetByIdRepository(data.id)

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetUserByIdController {
  export type Request = {
    id: string
  }
}

const GetUserByIdSchema = Joi.object({
  id: Joi.string().required()
})
