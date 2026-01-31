import { jest } from '@jest/globals'
import { Customer } from '../../../domain/entities/customer/customer.entity'
import { Product } from '../../../domain/entities/product/product.entity'
import { Password } from '../../../domain/entities/customer/value-object/password-hash.vo'
import { CreateProductUseCase } from './create-product.use-case'
import { CustomerRepository } from '../../repositories/customer/customer.repository'
import { ProductRepository } from '../../repositories/product/product.repository'

describe('CreateProductUseCase', () => {
  let customerRepo: jest.Mocked<CustomerRepository>
  let productRepo: jest.Mocked<ProductRepository>
  let useCase: CreateProductUseCase

  beforeEach(() => {
    customerRepo = {
      findById: jest.fn(),
      save: jest.fn(),
      findByEmail: jest.fn(),
    }

    productRepo = {
      create: jest.fn(),
      findById: jest.fn(),
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

    const product = Product.create({
      name: 'Sample Product',
      description: 'This is a sample product',
      sku: 'SP001',
      price: 100,
      stock: 50,
      currency: 'USD',
      isActive: true,
    })

    const result = await useCase.execute({ customerId: customer.id.toValue(), product })

    expect(result).toBe(product)
    expect(productRepo.create).toHaveBeenCalledWith(product)
  })
})
