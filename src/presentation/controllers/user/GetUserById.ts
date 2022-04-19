import { GetByIdRepository } from '@/infra/db/repositories/user'
import Joi from 'joi'
import { IdNotFoundError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'

export class GetUserByIdController implements Controller {
  async handle(request: GetUserByIdController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = GetUserByIdSchema.validate(request)

      if (error) {
        return badRequest(error)
      }

      const data = await GetByIdRepository(value.id)

      if (!data) {
        return badRequest(new IdNotFoundError())
      }

      return ok(data)
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
  id: Joi.string().required().id()
})
