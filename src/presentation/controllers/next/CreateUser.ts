import Joi from 'joi'

import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { CreateUserRepository } from '@/infra/db/repositories/user'

export class CreateUserController implements Controller {
  async handle(request: CreateUserController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = CreateUserSchema.validate(request)

      if (error) {
        return badRequest(error)
      }

      const user = await CreateUserRepository(value)

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateUserController {
  export type Request = {
    email: string
    emailVerified: Date
    image: string
    name: string
  }
}

const CreateUserSchema = Joi.object({
  email: Joi.string().required().email(),
  emailVerified: Joi.optional(),
  image: Joi.string(),
  name: Joi.string()
})
