import { describe, expect, it } from '@jest/globals'
import { Customer } from '../../../domain/entities/customer/customer.entity.js'
import { InMemoryCustomerRepository } from '../../../infrastructure/repositories/in-memory-customer.repository.js'
import { CreateCustomerUseCase } from './create-customer.use-case.js'
import { Password } from '../../../domain/value-objects/password-hash.vo.js'

describe('CreateCustomerUseCase', () => {
  it('should create a customer successfully', async () => {
    const customerRepository = new InMemoryCustomerRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    const newCustomerData = Customer.create({
      name: 'John Doe',
      email: 'john-doe@gmail.com',
      document: '12345678900',
      phone: '11999999999',
      password: Password.fromHashed('hashed_password'),
    })

    expect(async () => {
      await useCase.execute(newCustomerData)
    }).not.toThrow()
  })
})
