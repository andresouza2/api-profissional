import { AggregateRoot } from '../../../core/AggregateRoot'
import { UniqueEntityId } from '../../../core/UniqueEntityId'
import { OrderItem } from '../order-item/order-item.entity'

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderProps {
  customerId: UniqueEntityId
  status?: OrderStatus
  items?: OrderItem[]
  discount?: number
  notes?: string
  subtotal?: number
  total?: number
  createdAt?: Date
  updatedAt?: Date
}

export class Order extends AggregateRoot<OrderProps> {
  constructor(props: OrderProps, id?: UniqueEntityId) {
    super(
      {
        ...props,
        status: props.status ?? OrderStatus.PENDING,
        items: props.items ?? [],
        discount: props.discount ?? 0,
        subtotal: props.subtotal ?? 0,
        total: props.total ?? 0,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
  }

  get customerId(): UniqueEntityId {
    return this.props.customerId
  }
  get status(): OrderStatus {
    return this.props.status!
  }
  get items(): OrderItem[] {
    return this.props.items!
  }
  get discount(): number {
    return this.props.discount!
  }
  get notes(): string | undefined {
    return this.props.notes
  }
  get subtotal(): number {
    return this.props.items!.reduce((sum, item) => sum + item.totalPrice, 0)
  }

  get total(): number {
    return Math.max(0, this.subtotal - this.props.discount!)
  }
  get createdAt(): Date {
    return this.props.createdAt!
  }
  get updatedAt(): Date {
    return this.props.updatedAt!
  }

  addItem(productId: UniqueEntityId, quantity: number, unitPrice: number): void {
    this.validateCanModify()

    const existingItem = this.props.items!.find((item) => item.productId.toEquals(productId))

    if (existingItem) {
      existingItem.changeQuantity(existingItem.quantity + quantity)
    } else {
      const item = OrderItem.create({ productId, quantity, unitPrice })
      this.props.items!.push(item)
    }

    this.touch()
  }

  removeItem(itemId: UniqueEntityId): void {
    this.validateCanModify()

    const index = this.props.items!.findIndex((item) => item.id.toEquals(itemId))
    if (index === -1) throw new Error('Item não encontrado')

    this.props.items!.splice(index, 1)
    this.touch()
  }

  updateItemQuantity(itemId: UniqueEntityId, quantity: number): void {
    this.validateCanModify()

    const item = this.props.items!.find((item) => item.id.toEquals(itemId))
    if (!item) throw new Error('Item não encontrado')

    item.changeQuantity(quantity)
    this.touch()
  }

  applyDiscount(discount: number): void {
    if (discount < 0) throw new Error('Desconto não pode ser negativo')
    if (discount > this.subtotal) throw new Error('Desconto maior que o subtotal')
    this.props.discount = discount
    this.touch()
  }

  addNotes(notes: string): void {
    this.props.notes = notes
    this.touch()
  }

  confirm(): void {
    if (this.props.status !== OrderStatus.PENDING) {
      throw new Error('Apenas pedidos pendentes podem ser confirmados')
    }
    if (this.props.items!.length === 0) {
      throw new Error('Pedido deve ter pelo menos um item')
    }
    this.props.status = OrderStatus.CONFIRMED
    this.touch()
  }

  process(): void {
    if (this.props.status !== OrderStatus.CONFIRMED) {
      throw new Error('Apenas pedidos confirmados podem ser processados')
    }
    this.props.status = OrderStatus.PROCESSING
    this.touch()
  }

  ship(): void {
    if (this.props.status !== OrderStatus.PROCESSING) {
      throw new Error('Apenas pedidos em processamento podem ser enviados')
    }
    this.props.status = OrderStatus.SHIPPED
    this.touch()
  }

  deliver(): void {
    if (this.props.status !== OrderStatus.SHIPPED) {
      throw new Error('Apenas pedidos enviados podem ser entregues')
    }
    this.props.status = OrderStatus.DELIVERED
    this.touch()
  }

  cancel(): void {
    const cancellableStatuses = [OrderStatus.PENDING, OrderStatus.CONFIRMED]
    if (!cancellableStatuses.includes(this.props.status!)) {
      throw new Error('Pedido não pode ser cancelado neste status')
    }
    this.props.status = OrderStatus.CANCELLED
    this.touch()
  }

  private validateCanModify(): void {
    if (this.props.status !== OrderStatus.PENDING) {
      throw new Error('Pedido não pode ser modificado')
    }
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(props: OrderProps, id?: UniqueEntityId): Order {
    return new Order(props, id)
  }
}
