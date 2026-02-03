import { Entity } from '@core/Entity'
import { UniqueEntityId } from '@core/UniqueEntityId'

export interface OrderItemProps {
  productId: UniqueEntityId
  orderId?: UniqueEntityId
  quantity: number
  unitPrice: number
  totalPrice?: number
  createdAt?: Date
}

export class OrderItem extends Entity<OrderItemProps> {
  constructor(props: OrderItemProps, id?: UniqueEntityId) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    this.validate()
  }

  get productId(): UniqueEntityId {
    return this.props.productId
  }
  get orderId(): UniqueEntityId | undefined {
    return this.props.orderId
  }
  get quantity(): number {
    return this.props.quantity
  }
  get unitPrice(): number {
    return this.props.unitPrice
  }
  get totalPrice(): number {
    return this.props.quantity * this.props.unitPrice
  }
  get createdAt(): Date {
    return this.props.createdAt!
  }

  changeQuantity(quantity: number): void {
    if (quantity <= 0) throw new Error('Quantidade deve ser positiva')
    this.props.quantity = quantity
  }

  private validate(): void {
    if (this.props.quantity <= 0) throw new Error('Quantidade deve ser positiva')
    if (this.props.unitPrice < 0) throw new Error('Preço unitário inválido')
  }

  static create(props: OrderItemProps, id?: UniqueEntityId): OrderItem {
    return new OrderItem(props, id)
  }
}
