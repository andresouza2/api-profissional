import { HashService } from '../../services/hash.service'
import { TokenService, TokenPayload } from '../../services/token.service'

export class FakeHashService implements HashService {
  async hash(plain: string): Promise<string> {
    return `hashed_${plain}`
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return hashed === `hashed_${plain}`
  }
}

export class FakeTokenService implements TokenService {
  sign(payload: TokenPayload): string {
    return `token_${payload.sub}`
  }

  verify(token: string): TokenPayload | null {
    if (token.startsWith('token_')) {
      const sub = token.replace('token_', '')
      return {
        sub,
        email: 'test@email.com',
        role: 'USER',
      }
    }
    return null
  }
}
