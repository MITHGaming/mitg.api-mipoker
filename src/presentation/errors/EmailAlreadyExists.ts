import { BaseError } from './BaseError'

export class EmailAlreadyExists extends BaseError {
  constructor() {
    super(3, 'Email Provided is already using', 'EmailAlreadyExists')
  }
}
