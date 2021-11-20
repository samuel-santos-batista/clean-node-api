import { MissingParamError } from '../../presentation/erros'
import { RequiredFieldValidation } from './required-field-validation'
const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}
describe('RequiredField Validation', () => {
  test('Should returns a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ email: 'any_mail@mail.com' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
