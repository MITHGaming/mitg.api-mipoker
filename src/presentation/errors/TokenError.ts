import { BaseError } from './BaseError'

export class TokenError extends BaseError {
  constructor() {
    super(3, 'Token Provided is generating a error', 'TokenError')
  }
}
