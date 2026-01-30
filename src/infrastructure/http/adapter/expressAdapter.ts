import { Request, Response } from 'express'
import { HttpResponse } from '../response/HttpResponse'

export function adapterExpressRoute(controller: { handle: (req: any) => Promise<HttpResponse> }) {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(req)

    if (httpResponse.body) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }

    return res.status(httpResponse.statusCode).send()
  }
}
