import { BaseError } from './BaseError'

export class EmailAlreadyExistsError extends BaseError {
  constructor() {
    super(6, 'Email Provided is already using', 'EmailAlreadyExistsError')
  }
}
