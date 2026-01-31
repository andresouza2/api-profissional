import { describe, it, expect, beforeEach } from '@jest/globals'
import { Customer } from '../../../domain/entities/customer/customer.entity'
import { InvalidCredentialsError, UserInactiveError } from '../../../core/errors/auth.errors'
import { LoginUseCase } from './login.use-case'
import { InMemoryCustomerRepository } from '../../../infrastructure/repositories/in-memory-customer.repository'
import { FakeHashService, FakeTokenService } from './fake-services.service'
import { Password } from '../../../domain/entities/customer/value-object/password-hash.vo'

describe('LoginUseCase', () => {
  let sut: LoginUseCase
  let customerRepository: InMemoryCustomerRepository
  let hashService: FakeHashService
  let tokenService: FakeTokenService

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository()
    hashService = new FakeHashService()
    tokenService = new FakeTokenService()
    sut = new LoginUseCase(customerRepository, hashService, tokenService)
  })

  it('deve realizar login com credenciais válidas', async () => {
    const customer = Customer.create({
      name: 'João Silva',
      email: 'joao@email.com',
      document: '12345678901',
      password: Password.fromHashed('hashed_Senha123'),
    })
    customerRepository.save(customer)

    const result = await sut.execute({
      email: 'joao@email.com',
      password: 'Senha123',
    })

    expect(result.accessToken).toBeDefined()
    expect(result.customer.email).toBe('joao@email.com')
    expect(result.customer.name).toBe('João Silva')
  })

  it('deve registrar último login após autenticação', async () => {
    const customer = Customer.create({
      name: 'João Silva',
      email: 'joao@email.com',
      document: '12345678901',
      password: Password.fromHashed('hashed_Senha123'),
    })
    customerRepository.save(customer)

    expect(customer.lastLoginAt).toBeUndefined()

    await sut.execute({
      email: 'joao@email.com',
      password: 'Senha123',
    })

    expect(customer.lastLoginAt).toBeDefined()
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
    const customer = Customer.create({
      name: 'João Silva',
      email: 'joao@email.com',
      document: '12345678901',
      password: Password.fromHashed('hashed_Senha123'),
    })
    customerRepository.save(customer)

    await expect(
      sut.execute({
        email: 'joao@email.com',
        password: 'SenhaErrada123',
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })

  it('deve lançar erro quando cliente está inativo', async () => {
    const customer = Customer.create({
      name: 'João Silva',
      email: 'joao@email.com',
      document: '12345678901',
      password: Password.fromHashed('hashed_Senha123'),
      isActive: false,
    })
    customerRepository.save(customer)

    await expect(
      sut.execute({
        email: 'joao@email.com',
        password: 'Senha123',
      }),
    ).rejects.toThrow(UserInactiveError)
  })
})
