import { LogErrorRepository } from '../../data/protocols/db/log-error-repository'
import { Controller, HttpResponse, HttpRequest } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  controller: Controller
  logErrorRepository: LogErrorRepository
  constructor (controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle (httpRequest:HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
