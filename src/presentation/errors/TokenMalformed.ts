import { BaseError } from './BaseError'

export class TokenMalformedError extends BaseError {
  constructor() {
    super(3, 'Token Provided is malformed', 'TokenMalformedError')
  }
}
