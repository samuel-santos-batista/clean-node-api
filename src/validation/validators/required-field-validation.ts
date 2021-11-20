import { MissingParamError } from '../../presentation/erros'
import { Validation } from '../../presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (typeof input[this.fieldName] === 'undefined') {
      return new MissingParamError(this.fieldName)
    }
  }
}
