import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = { body: request.body }
    const htttpResponse = await controller.handle(httpRequest)
    if (htttpResponse.statusCode !== 200) {
      response.status(htttpResponse.statusCode).json({
        error: htttpResponse.body.message
      })
    }
    response.status(htttpResponse.statusCode).json(htttpResponse.body)
  }
}
