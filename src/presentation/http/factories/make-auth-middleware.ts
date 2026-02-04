import { AuthMiddleware } from '@presentation/http/middleware/auth.middleware'
import { JwtTokenService } from '@infrastructure/services/jwt-token-service'
import { env } from '@config/env.schema'

export function makeAuthMiddleware() {
  const tokenService = new JwtTokenService({
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  })
  const middleware = new AuthMiddleware(tokenService)

  return middleware.handle
}
