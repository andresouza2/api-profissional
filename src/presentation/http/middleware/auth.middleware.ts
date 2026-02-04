import { NextFunction, Request } from 'express'
import { TokenService } from '@domain/services/token.service'
import { unauthorized } from '@presentation/http/response/HttpResponses'
import { DomainError } from '@core/errors/domain-error'
import { HttpResponse } from '@presentation/http/response/HttpResponse'

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
  }
}

export class AuthMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  handle = async (
    request: AuthenticatedRequest,
    response: HttpResponse,
    next: NextFunction,
  ): Promise<void | HttpResponse> => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return unauthorized({ error: 'Unauthorized: No token provided', message: 'Token não fornecido' })
    }

    const [schema, token] = authHeader.split(' ')

    if (!/^Bearer$/i.test(schema) || !token) {
      return unauthorized({ error: 'Unauthorized: Invalid token format', message: 'Formato de token inválido' })
    }

    try {
      const payload = await this.tokenService.verify(token)

      request.user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      }
      next()
    } catch (error) {
      if (error instanceof DomainError) {
        return unauthorized({ error: `Unauthorized: ${error.message}`, message: error.message })
      }
      return unauthorized({ error: 'Unauthorized: Invalid token', message: 'Token inválido' })
    }
  }
}
