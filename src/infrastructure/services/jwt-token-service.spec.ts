import { describe, it, expect, beforeEach } from '@jest/globals'
import { JwtTokenService, JwtConfig } from '@infrastructure/services/jwt-token-service'

describe('JwtTokenService', () => {
  let jwtTokenService: JwtTokenService
  let config: JwtConfig

  beforeEach(() => {
    config = {
      secret: 'test-secret-key-123',
      expiresIn: 3600, // 1 hora
    }
    jwtTokenService = new JwtTokenService(config)
  })

  it('deve criar uma instância com configuração válida', () => {
    expect(jwtTokenService).toBeDefined()
  })

  it('deve lançar erro quando secret não é fornecido', () => {
    expect(() => {
      new JwtTokenService({
        secret: '',
        expiresIn: 3600,
      })
    }).toThrow('JWT secret is required')
  })

  it('deve assinar um payload e retornar um token válido', async () => {
    const payload = {
      sub: 'user-123',
      email: 'user@example.com',
      role: 'USER',
    }

    const token = await jwtTokenService.sign(payload)

    expect(token).toBeDefined()
    expect(typeof token).toBe('string')
    expect(token.split('.').length).toBe(3) // JWT tem 3 partes
  })

  it('deve verificar um token válido', async () => {
    const payload = {
      sub: 'user-456',
      email: 'test@example.com',
      role: 'ADMIN',
    }

    const token = await jwtTokenService.sign(payload)
    const decoded = await jwtTokenService.verify(token)

    expect(decoded.sub).toBe('user-456')
    expect(decoded.role).toBe('ADMIN')
  })

  it('deve lançar erro ao verificar token inválido', async () => {
    const invalidToken = 'invalid.token.format'

    expect(async () => {
      await jwtTokenService.verify(invalidToken)
    }).rejects.toThrow()
  })

  it('deve lançar erro ao verificar token com secret incorreto', async () => {
    const payload = {
      sub: 'user-789',
      email: 'user@test.com',
      role: 'USER',
    }

    const token = await jwtTokenService.sign(payload)

    const wrongService = new JwtTokenService({
      secret: 'wrong-secret',
      expiresIn: 3600,
    })

    expect(async () => {
      await wrongService.verify(token)
    }).rejects.toThrow()
  })

  it('deve suportar issuer na configuração', async () => {
    const serviceWithIssuer = new JwtTokenService({
      secret: 'test-secret',
      expiresIn: 3600,
      issuer: 'my-app',
    })

    const payload = {
      sub: 'user-001',
      email: 'issuer@test.com',
      role: 'USER',
    }

    const token = await serviceWithIssuer.sign(payload)
    const decoded = await serviceWithIssuer.verify(token)

    expect(decoded.sub).toBe('user-001')
  })

  it('deve suportar audience na configuração', async () => {
    const serviceWithAudience = new JwtTokenService({
      secret: 'test-secret',
      expiresIn: 3600,
      audience: 'my-client',
    })

    const payload = {
      sub: 'user-002',
      email: 'audience@test.com',
      role: 'USER',
    }

    const token = await serviceWithAudience.sign(payload)
    const decoded = await serviceWithAudience.verify(token)

    expect(decoded.sub).toBe('user-002')
  })

  it('deve assinar tokens diferentes para payloads diferentes', async () => {
    const payload1 = {
      sub: 'user-001',
      email: 'user1@example.com',
      role: 'USER',
    }

    const payload2 = {
      sub: 'user-002',
      email: 'user2@example.com',
      role: 'ADMIN',
    }

    const token1 = await jwtTokenService.sign(payload1)
    const token2 = await jwtTokenService.sign(payload2)

    expect(token1).not.toBe(token2)

    const decoded1 = await jwtTokenService.verify(token1)
    const decoded2 = await jwtTokenService.verify(token2)

    expect(decoded1.sub).toBe('user-001')
    expect(decoded2.sub).toBe('user-002')
  })
})
