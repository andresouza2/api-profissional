import { Product } from '@domain/entities/product/product.entity'
import { ProductRepository } from '@domain/repositories/product/product.repository'
import { prisma } from '@infrastructure/repositories/lib/prisma'
import { ProductMapper } from '@infrastructure/repositories/mappers/product.mapper'

export class ProductRepositoryImpl extends ProductRepository {
  async create(product: Product): Promise<void> {
    await prisma.products.create({
      data: {
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
      },
    })
  }
  async findById(id: string): Promise<Product | null> {
    const product = await prisma.products.findUnique({
      where: { id },
    })
    if (!product) return null

    return ProductMapper.toDomain({
      id: product.id,
      name: product.name,
      description: product.description,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      currency: product.currency,
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    })
  }
}
