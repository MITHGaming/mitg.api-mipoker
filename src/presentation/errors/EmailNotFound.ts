import { BaseError } from './BaseError'

export class EmailNotFoundError extends BaseError {
  constructor() {
    super(2, 'Email Provided is not found', 'EmailNotFoundError')
  }
}
