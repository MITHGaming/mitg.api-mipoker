import Joi from 'joi'

import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { GetByEmailRepository } from '@/infra/db/repositories/user'

export class GetUserByEmailController implements Controller {
  async handle(request: GetUserByEmailController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = GetUserByEmailSchema.validate(request)
      const data: GetUserByEmailController.Request = value

      if (error) {
        return badRequest(error)
      }

      const user = await GetByEmailRepository(data.email)

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetUserByEmailController {
  export type Request = {
    email: string
  }
}

const GetUserByEmailSchema = Joi.object({
  email: Joi.string().required()
})
