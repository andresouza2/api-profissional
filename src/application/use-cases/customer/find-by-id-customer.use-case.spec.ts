import { describe, it, jest } from '@jest/globals'
import { CustomerRepository } from '@domain/repositories/customer/customer.repository'
import { Customer } from '@domain/entities/customer/customer.entity'
import { FindByIDCustomerUseCase } from '@application/use-cases/customer/find-by-id-customer.use-case'
import { Address } from '@/domain/entities/customer/value-object/address.vo'

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
    const address = new Address({
      street: 'Rua Principal',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil',
    })

    const mockCustomer: Customer = {
      toJSON: () => ({
        id: '12345',
        name: 'John Doe',
        email: 'john.doe@example.com',
        document: '123.456.789-00',
        phone: '555-1234',
        address: address,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    } as Customer
    repository.findById.mockResolvedValue(mockCustomer)

    const customerSut = await sut.execute('12345')

    expect(repository.findById).toHaveBeenCalledWith('12345')
    expect(customerSut).toBeDefined()
    expect(customerSut.id).toBe('12345')
    expect(customerSut.name).toBe('John Doe')
    expect(customerSut.email).toBe('john.doe@example.com')
    expect(customerSut.document).toBe('123.456.789-00')
    expect(customerSut.phone).toBe('555-1234')
    expect(customerSut.isActive).toBe(true)
    expect(customerSut.address?.street).toBe('Rua Principal')
    expect(customerSut.address?.number).toBe('123')
    expect(customerSut.address?.neighborhood).toBe('Centro')
    expect(customerSut.address?.city).toBe('São Paulo')
    expect(customerSut.address?.state).toBe('SP')
    expect(customerSut.address?.zipCode).toBe('01234-567')
    expect(customerSut.address?.country).toBe('Brasil')
  })

  it('deve retornar erro se o cliente não for encontrado', async () => {
    const customer = await sut.execute('non-existent-id').catch((error) => error)

    expect(repository.findById).toHaveBeenCalledWith('non-existent-id')
    expect(customer).toBeInstanceOf(Error)
  })
})
