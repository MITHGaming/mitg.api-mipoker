import { BaseError } from './BaseError'

export class TokenExpireError extends BaseError {
  constructor() {
    super(3, 'Token Provided is already expired', 'TokenExpireError')
  }
}
