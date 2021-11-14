import { MissingParamError } from '../../erros'
import { Validation } from '../../protocols'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (typeof input[this.fieldName] === 'undefined') {
      return new MissingParamError(this.fieldName)
    }
  }
}
