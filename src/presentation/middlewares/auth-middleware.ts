import { AccessDeniedError } from '../erros'
import { forbidden } from '../helper/http/http-helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = new AccessDeniedError()
    return new Promise(resolve => resolve(forbidden(error)))
  }
}
