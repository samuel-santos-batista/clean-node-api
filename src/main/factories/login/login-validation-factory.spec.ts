import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helper/validators'
import { Validation } from '../../../presentation/protocols'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../presentation/helper/validators/validation-composite')

const makeSutEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeSutEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
