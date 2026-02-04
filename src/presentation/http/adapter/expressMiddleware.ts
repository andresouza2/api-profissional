import { Request, Response, NextFunction } from 'express'
import { HttpResponse } from '@presentation/http/response/HttpResponse'

export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void | Promise<void>

export function adapterExpressMiddleware(
  middleware: (req: Request, res: Response, next: NextFunction) => Promise<void | HttpResponse>,
): ExpressMiddleware {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await middleware(req, res, next)

    if (result && result instanceof Object && 'statusCode' in result && 'body' in result) {
      const httpResponse = result as HttpResponse

      if (httpResponse.body) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).send()
      }
    }
  }
}
