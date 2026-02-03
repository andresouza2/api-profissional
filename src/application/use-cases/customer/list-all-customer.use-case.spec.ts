import { beforeEach, describe, it } from '@jest/globals'
import { ListAllCustomerUseCase } from '@application/use-cases/customer/list-all-customer.use-case'
import { CreateCustomerUseCase } from '@application/use-cases/customer/create-customer.use-case'
import { FakeHashService } from '@application/use-cases/auth/fake-services.service'
import { InMemoryCustomerRepository } from '@infrastructure/repositories/in-memory-customer.repository'

describe('ListAllCustomerUseCase', () => {
  let sut: ListAllCustomerUseCase
  let createCustomerUseCase: CreateCustomerUseCase
  let hashService: FakeHashService
  let customerRepo: InMemoryCustomerRepository

  beforeEach(() => {
    customerRepo = new InMemoryCustomerRepository()
    hashService = new FakeHashService()

    sut = new ListAllCustomerUseCase(customerRepo)
    createCustomerUseCase = new CreateCustomerUseCase(customerRepo, hashService)
  })

  it('should list all customers', async () => {
    for (let i = 1; i <= 20; i++) {
      await createCustomerUseCase.execute({
        name: `Customer-${i}`,
        email: `customer-${i}@example.com`,
        document: `1234567890${i}`,
        phone: `1199999999${i}`,
        password: 'ValidPass1!',
        address: undefined,
      })
    }

    const customers = await sut.execute()

    expect(customers).toHaveLength(20)
    expect(customers[0].name).toBe('Customer-1')
    expect(customers[19].name).toBe('Customer-20')
  })
})
