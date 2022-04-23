import { BaseError } from './BaseError'

export class UnauthorizedError extends BaseError {
  constructor() {
    super(3, 'You do not have permission to use this feature', 'UnauthorizedError')
  }
}
