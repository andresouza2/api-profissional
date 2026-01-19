import { AggregateRoot } from '../../../core/AggregateRoot.js'
import { UniqueEntityId } from '../../../core/UniqueEntityId.js'

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

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  private validate(): void {
    // Add validation logic here if needed
  }
}
