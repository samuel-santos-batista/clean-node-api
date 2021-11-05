import { Controller, HttpResponse, HttpRequest } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  controller: Controller
  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest:HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    return httpResponse
    // return new Promise(resolve => resolve(null))
  }
}
