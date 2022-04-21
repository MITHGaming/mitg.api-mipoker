import hashPassword from '@/infra/bcrypt/hash'
import { GetByEmailRepository, GetByUsernameRepository } from '@/infra/db/repositories/user'
import CreateUserRepository from '@/infra/db/repositories/user/CreateUser'
import { EmailAlreadyExistsError, UsernameAlreadyExistsError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import Joi from 'joi'

export class CreateUserController implements Controller {
  async handle(request: CreateUserController.Request): Promise<HttpResponse> {
    try {
      const { value, error } = CreateUserSchema.validate(request)
      const { passwordConfirmation, ...data } = value

      if (error) {
        return badRequest(error)
      }

      const emailAlreadyExists = await GetByEmailRepository(data.email)

      if (emailAlreadyExists) {
        return badRequest(new EmailAlreadyExistsError())
      }

      const usernameAlreadyExists = await GetByUsernameRepository(data.username)

      if (usernameAlreadyExists) {
        return badRequest(new UsernameAlreadyExistsError())
      }

      const passwordHashed = await hashPassword(data.password)

      const user = await CreateUserRepository({
        ...data,
        password: passwordHashed
      })

      return ok(user)
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
    password: string
    passwordConfirmation: string
    emailVerified?: Date
    image?: string
  }
}

const CreateUserSchema = Joi.object({
  name: Joi.string().min(3).max(255),
  username: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().max(120).min(3).required(),
  password: Joi.string().min(3).max(255).required(),
  passwordConfirmation: Joi.string().min(3).max(255).required().equal(Joi.ref('password')),
  emailVerified: Joi.date(),
  image: Joi.string()
})
