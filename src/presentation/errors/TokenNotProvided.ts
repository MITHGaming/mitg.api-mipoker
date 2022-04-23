import { BaseError } from './BaseError'

export class TokenNotProvidedError extends BaseError {
  constructor() {
    super(3, 'Token is not Provided', 'TokenNotProvidedError')
  }
}
