import { Request, Response } from 'express'

export class HealthController {
  handle(_: Request, res: Response): Response {
    return res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
    })
  }
}
