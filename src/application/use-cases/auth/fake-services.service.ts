import { HashService } from '@domain/services/hash.service'
import { TokenService, TokenPayload } from '@domain/services/token.service'

export class FakeHashService implements HashService {
  async hash(plain: string): Promise<string> {
    return `hashed_${plain}`
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return hashed === `hashed_${plain}`
  }
}

export class FakeTokenService implements TokenService {
  async sign(payload: TokenPayload): Promise<string> {
    return `token_${payload.sub}`
  }

  async verify(token: string): Promise<TokenPayload> {
    if (token.startsWith('token_')) {
      const sub = token.replace('token_', '')
      return {
        sub,
        email: 'test@email.com',
        role: 'USER',
      }
    }
    throw new Error('Invalid token')
  }
}
