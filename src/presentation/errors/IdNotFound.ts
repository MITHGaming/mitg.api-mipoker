import { BaseError } from './BaseError'

export class IdNotFoundError extends BaseError {
  constructor() {
    super(3, 'Id Provided is not found', 'IdNotFoundError')
  }
}
