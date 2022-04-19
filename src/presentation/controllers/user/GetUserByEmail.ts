import Joi from 'joi'
import { GetByEmailRepository } from '@/infra/db/repositories/user/GetByEmail'
import { EmailNotFoundError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'

export class GetUserByEmailController implements Controller {
  async handle(request: GetUserByEmailController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = GetUserByEmailSchema.validate(request)

      if (error) {
        return badRequest(error)
      }

      const data = await GetByEmailRepository(value.email)

      if (!data) {
        return badRequest(new EmailNotFoundError())
      }

      return ok(data)
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
  email: Joi.string().required().email()
})
