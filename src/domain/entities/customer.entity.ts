import { AggregateRoot } from '../../core/AggregateRoot'
import { UniqueEntityId } from '../../core/UniqueEntityId'
import { Address } from '../value-objects/address.vo'

interface CustomerProps {
  name: string
  email: string
  document: string
  phone?: string
  address?: Address
  createdAt?: Date
  updatedAt?: Date
}

export class Customer extends AggregateRoot<CustomerProps> {
  constructor(props: CustomerProps, id?: UniqueEntityId) {
    super(
      {
        ...props,
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
  get email(): string {
    return this.props.email
  }
  get document(): string {
    return this.props.document
  }
  get phone(): string | undefined {
    return this.props.phone
  }
  get address(): Address | undefined {
    return this.props.address
  }
  get createdAt(): Date {
    return this.props.createdAt!
  }
  get updatedAt(): Date {
    return this.props.updatedAt!
  }

  changeName(name: string): void {
    if (!name?.trim() || name.length === 0) {
      throw new Error('Name is required')
    }
    this.props.name = name
    this.touch()
  }
  changeAddress(address: Address): void {
    this.props.address = address
    this.touch()
  }

  changePhone(phone?: string): void {
    this.props.phone = phone
    this.touch()
  }

  touch(): void {
    this.props.updatedAt = new Date()
  }

  private validate(): void {
    if (!this.props.name?.trim()) throw new Error('Nome obrigatório')
    if (!this.props.email?.includes('@')) throw new Error('Email inválido')
    if (!this.props.document?.trim()) throw new Error('Documento obrigatório')
  }

  static create(props: CustomerProps, id?: UniqueEntityId): Customer {
    return new Customer(props, id)
  }
}
