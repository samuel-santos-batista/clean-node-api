import { MissingParamError } from '../../erros'
import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
  private readonly fieldName: string
  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (typeof input[this.fieldName] === 'undefined') {
      return new MissingParamError(this.fieldName)
    }
  }
}
