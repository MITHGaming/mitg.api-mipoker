import { GetByEmailRepository } from '@/infra/db/repositories/user/GetByEmail'
import Joi from 'joi'
import { EmailNotFoundError } from '../errors'
import { badRequest, ok, serverError } from '../helper'
import { HttpResponse } from '../protocols'
import { Controller } from '../protocols/controller'

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
