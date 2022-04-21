import { ok, serverError } from '@/presentation/helper'
import { HttpResponse } from '@/presentation/protocols'
import { Controller } from '@/presentation/protocols/controller'
import { CreateAccountRepository } from '@/infra/db/repositories/account'

export class CreateAccountController implements Controller {
  async handle(request: CreateAccountController.Request): Promise<HttpResponse> {
    try {
      const user = await CreateAccountRepository(request)

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateAccountController {
  export type Request = {}
}
