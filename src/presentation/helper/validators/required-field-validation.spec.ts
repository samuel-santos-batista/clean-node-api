import { MissingParamError } from '../../erros'
import { RequiredFieldValidation } from './required-field-validation'
describe('RequiredField Validation', () => {
  test('Should reuturns a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ email: 'any_mail@mail.com' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
