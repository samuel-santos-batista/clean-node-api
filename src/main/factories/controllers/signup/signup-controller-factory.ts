import { SignUpController } from '../../../../presentation/controllers/account/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../../../main/factories/usescases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../../../main/factories/usescases/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../../../main/factories/decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
