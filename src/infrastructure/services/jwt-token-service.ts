import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { TokenPayload, TokenService } from '@domain/services/token.service'

export interface JwtConfig {
  secret: string
  expiresIn: SignOptions['expiresIn']
  issuer?: string
  audience?: string
}

export class JwtTokenService implements TokenService {
  private readonly config: JwtConfig

  constructor(config: JwtConfig) {
    if (!config.secret) {
      throw new Error('JWT secret is required')
    }
    this.config = config
  }

  async sign(payload: TokenPayload): Promise<string> {
    const options: SignOptions = {
      expiresIn: this.config.expiresIn,
      subject: payload.sub,
    }

    if (this.config.issuer) {
      options.issuer = this.config.issuer
    }

    if (this.config.audience) {
      options.audience = this.config.audience
    }

    return jwt.sign(
      {
        role: payload.role,
        email: payload.email,
      },
      this.config.secret,
      options,
    )
  }

  async verify(token: string): Promise<TokenPayload> {
    try {
      const decoded = jwt.verify(token, this.config.secret) as JwtPayload & TokenPayload

      if (!decoded.sub) {
        throw new Error('Invalid token: subject is missing')
      }

      return {
        sub: decoded.sub,
        email: decoded.email,
        role: decoded.role,
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error(`Invalid token: ${error.message}`)
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token has expired')
      }
      throw error
    }
  }
}
