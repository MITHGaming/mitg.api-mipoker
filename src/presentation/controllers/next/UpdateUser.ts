import Joi from 'joi'

import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { UpdateUserRepository } from '@/infra/db/repositories/user'

export class UpdateUserController implements Controller {
  async handle(request: UpdateUserController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = UpdateUserSchema.validate(request)

      if (error) {
        return badRequest(error)
      }

      const { id, ...data }: UpdateUserController.Request = value

      const user = await UpdateUserRepository(id, data)

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateUserController {
  export type Request = {
    id: string
    email: string
    emailVerified: Date
    image: string
    name: string
  }
}

const UpdateUserSchema = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().required().email(),
  emailVerified: Joi.optional(),
  image: Joi.string(),
  name: Joi.string()
})
