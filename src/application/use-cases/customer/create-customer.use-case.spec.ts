import { describe, expect, it } from '@jest/globals'
import { Customer } from '../../../domain/entities/customer/customer.entity'
import { InMemoryCustomerRepository } from '../../../infrastructure/repositories/in-memory-customer.repository'
import { CreateCustomerUseCase } from './create-customer.use-case'

describe('CreateCustomerUseCase', () => {
  it('should create a customer successfully', async () => {
    const customerRepository = new InMemoryCustomerRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    const newCustomerData = new Customer({
      name: 'John Doe',
      email: 'john-doe@gmail.com',
      document: '12345678900',
      phone: '11999999999',
    })

    expect(async () => {
      await useCase.execute(newCustomerData)
    }).not.toThrow()
  })
})
