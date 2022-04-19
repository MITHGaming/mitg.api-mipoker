import { BaseError } from './BaseError'

export class UserNotFoundError extends BaseError {
  constructor() {
    super(5, 'User not found using this parameter', 'UserNotFoundError')
  }
}
