import { InvalidProductError, ProductError } from '@/domain/errors/product-error'
import { AggregateRoot } from '@core/AggregateRoot'
import { UniqueEntityId } from '@core/UniqueEntityId'

interface ProductProps {
  name: string
  description: string
  sku: string
  price: number
  stock: number
  currency: string
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export class Product extends AggregateRoot<ProductProps> {
  constructor(props: ProductProps, id?: UniqueEntityId) {
    super(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    this.validate()
  }

  get name(): string {
    return this.props.name
  }
  get description(): string {
    return this.props.description
  }
  get sku(): string {
    return this.props.sku
  }
  get price(): number {
    return this.props.price
  }
  get stock(): number {
    return this.props.stock
  }
  get currency(): string {
    return this.props.currency
  }
  get isActive(): boolean {
    return this.props.isActive!
  }
  get createdAt(): Date {
    return this.props.createdAt!
  }
  get updatedAt(): Date {
    return this.props.updatedAt!
  }

  changeName(name: string): void {
    if (!name?.trim()) throw new InvalidProductError(['Nome é obrigatório.'])
    this.props.name = name
    this.touch()
  }
  changePrice(price: number): void {
    if (price <= 0) throw new ProductError('O preço deve ser maior que zero.')
    this.props.price = price
    this.touch()
  }
  addStock(quantity: number): void {
    if (quantity <= 0) throw new ProductError('A quantidade deve ser maior que zero.')
    this.props.stock += quantity
    this.touch()
  }
  removeStock(quantity: number): void {
    if (quantity <= 0) throw new ProductError('Quantidade deve ser positiva')
    if (this.props.stock < quantity) throw new ProductError('Estoque insuficiente')
    this.props.stock -= quantity
    this.touch()
  }
  activate(): void {
    this.props.isActive = true
    this.touch()
  }
  deactivate(): void {
    this.props.isActive = false
    this.touch()
  }
  hasStock(quantity: number): boolean {
    return this.props.stock >= quantity
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  private validate(): void {
    const violations: string[] = []

    if (!this.props.name?.trim()) violations.push('Nome obrigatório')
    if (!this.props.sku?.trim()) violations.push('SKU obrigatório')
    if (this.props.price < 0) violations.push('Preço inválido')
    if (this.props.stock < 0) violations.push('Estoque inválido')

    if (violations.length > 0) {
      throw new InvalidProductError(violations)
    }
  }

  static create(props: ProductProps, id?: UniqueEntityId): Product {
    return new Product(props, id)
  }
}
