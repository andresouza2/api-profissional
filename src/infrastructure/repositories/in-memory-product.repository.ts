import { ProductRepository } from '@domain/repositories/product/product.repository'
import { Product } from '@domain/entities/product/product.entity'
export class InMemoryProductRepository extends ProductRepository {
  private readonly products = <Product[]>[]

  async create(product: Product): Promise<void> {
    this.products.push(product)
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id.toValue() === id) ?? null
    return product
  }
}
