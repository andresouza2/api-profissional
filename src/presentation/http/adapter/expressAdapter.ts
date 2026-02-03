import { Request, Response } from 'express'
import { HttpResponse } from '@presentation/http/response/HttpResponse'
import { HttpRequest } from '@presentation/http/request/http-request'

export interface HttpController {
  handle(request: HttpRequest): Promise<HttpResponse>
}

export function adapterExpressRoute(controller: HttpController) {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    }

    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.body) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }

    return res.status(httpResponse.statusCode).send()
  }
}
