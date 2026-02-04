import { Product } from '@/domain/entities/product/product.entity'

export class ProductMapper {
  static toDomain(raw: any): Product {
    return Product.create(
      {
        name: raw.name,
        description: raw.description,
        sku: raw.sku,
        price: raw.price,
        stock: raw.stock,
        currency: raw.currency,
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }

  static toPrisma(product: Product): any {
    return {
      id: product.id?.toValue(),
      name: product.name,
      description: product.description,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      currency: product.currency,
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}
