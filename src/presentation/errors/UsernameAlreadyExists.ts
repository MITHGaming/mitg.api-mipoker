import { BaseError } from './BaseError'

export class UsernameAlreadyExistsError extends BaseError {
  constructor() {
    super(3, 'Username Provided is already using', 'UsernameAlreadyExistsError')
  }
}
