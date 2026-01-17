import { describe, it, expect, beforeEach } from '@jest/globals'
import { User, UserRole } from '../../../domain/entities/user/user.entity'
import { Email } from '../../../domain/value-objects/email.vo'
import { InvalidCredentialsError, UserInactiveError } from '../../../core/errors/auth.errors'
import { LoginUseCase } from './login.use-case'
import { InMemoryUserRepository } from '../../../infrastructure/repositories/in-memory-user-repository'
import { FakeHashService, FakeTokenService } from './fake-services.service'
import { Password } from '../../../domain/value-objects/password-hash.vo'

describe('LoginUseCase', () => {
  let sut: LoginUseCase
  let userRepository: InMemoryUserRepository
  let hashService: FakeHashService
  let tokenService: FakeTokenService

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    hashService = new FakeHashService()
    tokenService = new FakeTokenService()
    sut = new LoginUseCase(userRepository, hashService, tokenService)
  })

  it('deve realizar login com credenciais válidas', async () => {
    const user = User.create({
      name: 'João Silva',
      email: Email.create('joao@email.com'),
      password: Password.fromHashed('hashed_Senha123'),
    })
    userRepository.save(user)

    const result = await sut.execute({
      email: 'joao@email.com',
      password: 'Senha123',
    })

    expect(result.accessToken).toBeDefined()
    expect(result.user.email).toBe('joao@email.com')
    expect(result.user.name).toBe('João Silva')
  })

  it('deve registrar último login após autenticação', async () => {
    const user = User.create({
      name: 'João Silva',
      email: Email.create('joao@email.com'),
      password: Password.fromHashed('hashed_Senha123'),
    })
    userRepository.save(user)

    expect(user.lastLoginAt).toBeUndefined()

    await sut.execute({
      email: 'joao@email.com',
      password: 'Senha123',
    })

    expect(user.lastLoginAt).toBeDefined()
  })

  it('deve lançar erro com email inexistente', async () => {
    await expect(
      sut.execute({
        email: 'naoexiste@email.com',
        password: 'Senha123',
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })

  it('deve lançar erro com senha incorreta', async () => {
    const user = User.create({
      name: 'João Silva',
      email: Email.create('joao@email.com'),
      password: Password.fromHashed('hashed_Senha123'),
    })
    userRepository.save(user)

    await expect(
      sut.execute({
        email: 'joao@email.com',
        password: 'SenhaErrada123',
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })

  it('deve lançar erro quando usuário está inativo', async () => {
    const user = User.create({
      name: 'João Silva',
      email: Email.create('joao@email.com'),
      password: Password.fromHashed('hashed_Senha123'),
      isActive: false,
    })
    userRepository.save(user)

    await expect(
      sut.execute({
        email: 'joao@email.com',
        password: 'Senha123',
      }),
    ).rejects.toThrow(UserInactiveError)
  })

  it('deve retornar role do usuário no token', async () => {
    const admin = User.create({
      name: 'Admin',
      email: Email.create('admin@email.com'),
      password: Password.fromHashed('hashed_Admin123'),
      role: UserRole.ADMIN,
    })
    userRepository.save(admin)

    const result = await sut.execute({
      email: 'admin@email.com',
      password: 'Admin123',
    })

    expect(result.user.role).toBe('ADMIN')
  })

  it('deve normalizar email para lowercase', async () => {
    const user = User.create({
      name: 'João Silva',
      email: Email.create('joao@email.com'),
      password: Password.fromHashed('hashed_Senha123'),
    })
    userRepository.save(user)

    const result = await sut.execute({
      email: 'JOAO@EMAIL.COM',
      password: 'Senha123',
    })

    expect(result.user.email).toBe('joao@email.com')
  })
})
