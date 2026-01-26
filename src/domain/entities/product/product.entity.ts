import { AggregateRoot } from '../../../core/AggregateRoot'
import { UniqueEntityId } from '../../../core/UniqueEntityId'

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

  changeName(name: string): void {
    if (!name?.trim()) throw new Error('Nome é obrigatório.')
    this.props.name = name
    this.touch()
  }
  changePrice(price: number): void {
    if (price <= 0) throw new Error('O preço deve ser maior que zero.')
    this.props.price = price
    this.touch()
  }
  addStock(quantity: number): void {
    if (quantity <= 0) throw new Error('A quantidade deve ser maior que zero.')
    this.props.stock += quantity
    this.touch()
  }
  removeStock(quantity: number): void {
    if (quantity <= 0) throw new Error('Quantidade deve ser positiva')
    if (this.props.stock < quantity) throw new Error('Estoque insuficiente')
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
    if (!this.props.name?.trim()) throw new Error('Nome obrigatório')
    if (!this.props.sku?.trim()) throw new Error('SKU obrigatório')
    if (this.props.price < 0) throw new Error('Preço inválido')
    if (this.props.stock < 0) throw new Error('Estoque inválido')
  }

  static create(props: ProductProps, id?: UniqueEntityId): Product {
    return new Product(props, id)
  }
}
