import { NextFunction, Request, Response } from 'express'
import { ZodError, z } from 'zod'

export const validateRequest = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body)
      req.body = validated
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Validação falhou',
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        })
      }
      next(error)
    }
  }
}
