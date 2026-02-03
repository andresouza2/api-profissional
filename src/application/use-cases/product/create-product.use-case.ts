import { Product } from '@domain/entities/product/product.entity'
import { CustomerRepository } from '@domain/repositories/customer/customer.repository'
import { ProductRepository } from '@domain/repositories/product/product.repository'

interface CreateProductInput {
  customerId: string
  product: Product
}

export class CreateProductUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(data: CreateProductInput): Promise<Product> {
    const { customerId, product } = data
    const customer = await this.customerRepository.findById(customerId)

    if (!customer) {
      throw new Error('Customer not found')
    }

    await this.productRepository.create(product)
    return product
  }
}
