import { Product } from '@domain/entities/product/product.entity'

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>
  abstract findById(id: string): Promise<Product | null>
  abstract findAll(): Promise<Product[]>
}
