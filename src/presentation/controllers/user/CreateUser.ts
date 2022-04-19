import { GetByEmailRepository } from '@/infra/db/repositories/user'
import CreateUserRepository from '@/infra/db/repositories/user/CreateUser'
import { EmailAlreadyExists } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import Joi from 'joi'

export class CreateUserController implements Controller {
  async handle(request: CreateUserController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = CreateUserSchema.validate(request)

      if (error) {
        return badRequest(error)
      }

      const emailAlreadyExists = await GetByEmailRepository(value.email)

      if (emailAlreadyExists) {
        return badRequest(new EmailAlreadyExists())
      }

      const data = await CreateUserRepository(value)

      return ok(data)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateUserController {
  export type Request = {
    name?: string
    username: string
    email: string
    emailVerified?: Date
    image?: string
  }
}

const CreateUserSchema = Joi.object({
  name: Joi.string(),
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  emailVerified: Joi.date(),
  image: Joi.string()
})
