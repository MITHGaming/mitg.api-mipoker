import { BaseError } from './BaseError'

export class LoginInvalidError extends BaseError {
  constructor() {
    super(2, 'Login is invalid', 'LoginInvalidError')
  }
}
