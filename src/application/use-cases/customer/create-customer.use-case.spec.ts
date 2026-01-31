import { describe, expect, it } from '@jest/globals'
import { InMemoryCustomerRepository } from '../../../infrastructure/repositories/in-memory-customer.repository'
import { CreateCustomerDTO, CreateCustomerUseCase } from './create-customer.use-case'

describe('CreateCustomerUseCase', () => {
  it('should create a customer successfully', async () => {
    const customerRepository = new InMemoryCustomerRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    const newCustomerData: CreateCustomerDTO = {
      name: 'John Doe',
      email: 'john-doe@gmail.com',
      document: '12345678900',
      phone: '11999999999',
      password: 'ValidPass1!',
      address: undefined,
    }

    const result = await useCase.execute(newCustomerData)

    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.name).toBe(newCustomerData.name)
    expect(result.email).toBe(newCustomerData.email)
    expect(result.document).toBe(newCustomerData.document)
    expect(result.phone).toBe(newCustomerData.phone)
  })
})
