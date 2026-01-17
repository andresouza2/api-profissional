export interface TokenPayload {
  sub: string
  email: string
  role: string
}

export abstract class TokenService {
  abstract sign(payload: TokenPayload): string
  abstract verify(token: string): TokenPayload | null
}
