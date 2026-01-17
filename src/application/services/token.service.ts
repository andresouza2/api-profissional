export interface TokenPayload {
  sub: string
  email: string
  role: string
}

export abstract class TokenService {
  abstract sign(): Promise<string>
  abstract verify(token: string): TokenPayload | null
}
