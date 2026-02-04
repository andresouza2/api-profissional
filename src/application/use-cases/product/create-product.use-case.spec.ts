import { jest } from '@jest/globals'
import { Password } from '@domain/entities/customer/value-object'
import { CreateProductUseCase } from './create-product.use-case'
import { CustomerRepository } from '@domain/repositories/customer/customer.repository'
import { ProductRepository } from '@domain/repositories/product/product.repository'
import { Customer } from '@domain/entities/customer/customer.entity'

describe('CreateProductUseCase', () => {
  let customerRepo: jest.Mocked<CustomerRepository>
  let productRepo: jest.Mocked<ProductRepository>
  let useCase: CreateProductUseCase

  beforeEach(() => {
    customerRepo = {
      findById: jest.fn(),
      save: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
    }

    productRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    }
    useCase = new CreateProductUseCase(customerRepo, productRepo)
  })

  it('should create a product successfully', async () => {
    const customer = Customer.create({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: Password.fromHashed('123456_Hash'),
      document: '98765432100',
    })
    customerRepo.findById.mockResolvedValue(customer)

    const result = await useCase.execute({
      customerId: customer.id.toValue(),
      name: 'Sample Product',
      description: 'This is a sample product',
      sku: 'SP001',
      price: 100,
      stock: 50,
      currency: 'USD',
    })

    expect(result.name).toBe('Sample Product')
    expect(result.description).toBe('This is a sample product')
    expect(result.sku).toBe('SP001')
    expect(result.price).toBe(100)
    expect(result.stock).toBe(50)
    expect(result.currency).toBe('USD')
  })
})
