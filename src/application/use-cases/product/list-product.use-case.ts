import { ProductRepository } from '@/domain/repositories/product/product.repository'
import { ProductOutput } from './dto/product-dto'

export class ListProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductOutput[]> {
    const products = await this.productRepository.findAll()

    return products.map((product) => ({
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      currency: product.currency,
    }))
  }
}
