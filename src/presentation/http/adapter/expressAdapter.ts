import { Request, Response } from 'express'
import { HttpResponse } from '../response/HttpResponse'

export interface HttpController {
  handle(request: HttpRequest): Promise<HttpResponse>
}
export interface HttpRequest<TBody = unknown, TParams = unknown, TQuery = unknown, THeaders = unknown> {
  body?: TBody
  params?: TParams
  query?: TQuery
  headers?: THeaders
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
