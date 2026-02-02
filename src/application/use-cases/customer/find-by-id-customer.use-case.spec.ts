import { describe, it, jest } from '@jest/globals'
import { FindByIDCustomerUseCase } from './find-by-id-customer.use-case'
import { CustomerRepository } from '../../repositories/customer/customer.repository'
import { Customer } from '../../../domain/entities/customer/customer.entity'

describe('FindByIdCustomerUseCase', () => {
  let sut: FindByIDCustomerUseCase
  let repository: jest.Mocked<CustomerRepository>

  beforeEach(() => {
    repository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
    }
    sut = new FindByIDCustomerUseCase(repository)
  })

  it('deve encontrar um cliente pelo ID', async () => {
    const mockCustomer: Customer = {
      toJSON: () => ({
        id: '12345',
        name: 'John Doe',
        email: 'john.doe@example.com',
        document: '123.456.789-00',
        phone: '555-1234',
        address: {},
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    } as Customer
    repository.findById.mockResolvedValue(mockCustomer)

    const customerSut = await sut.execute('12345')

    expect(repository.findById).toHaveBeenCalledWith('12345')
    expect(customerSut).toBeDefined()
    expect((customerSut as Customer).toJSON()).toEqual(mockCustomer.toJSON())
  })

  it('deve retornar erro se o cliente não for encontrado', async () => {
    const customer = await sut.execute('non-existent-id').catch((error) => error)

    expect(repository.findById).toHaveBeenCalledWith('non-existent-id')
    expect(customer).toBeInstanceOf(Error)
  })
})
