export interface TokenPayload {
  sub: string
  email: string
  role: string
}

export abstract class TokenService {
  abstract sign(payload: TokenPayload): Promise<string>
  abstract verify(token: string): Promise<TokenPayload>
}
