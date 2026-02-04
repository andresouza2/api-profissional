import { Product } from '@domain/entities/product/product.entity'
import { CustomerRepository } from '@domain/repositories/customer/customer.repository'
import { ProductRepository } from '@domain/repositories/product/product.repository'
import { CreateProductInput } from '@application/use-cases/product/dto/product-dto'
import { CustomerNotFoundError } from '@domain/entities/customer/errors'

export class CreateProductUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(data: CreateProductInput): Promise<Product> {
    const { customerId, name, description, sku, price, stock, currency } = data

    const customer = await this.customerRepository.findById(customerId)
    if (!customer) {
      throw new CustomerNotFoundError('Customer not found')
    }

    const product = Product.create({
      name,
      description,
      sku,
      price,
      stock,
      currency,
    })

    await this.productRepository.create(product)
    return product
  }
}
