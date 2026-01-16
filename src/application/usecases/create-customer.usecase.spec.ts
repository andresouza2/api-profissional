import { describe, expect, it } from '@jest/globals'
import { Customer } from '../../domain/entities/customer.entity'
import { CustomerRepositoryImpl } from '../../infrastructure/repositories/customer.impl.repository'
import { CreateCustomerUseCase } from './create-customer.usecase'

describe('CreateCustomerUseCase', () => {
  it('should create a customer successfully', async () => {
    // TODO: implement customer creation logic
    const customerRepository = new CustomerRepositoryImpl()
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
