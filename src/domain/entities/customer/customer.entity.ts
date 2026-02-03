import { AggregateRoot } from '../../../core/AggregateRoot'
import { UniqueEntityId } from '../../../core/UniqueEntityId'
import { InvalidCustomerError, InvalidFieldsCustomerError } from '@domain/entities/customer/errors'
import { Address, Password } from '@domain/entities/customer/value-object'

interface CustomerProps {
  name: string
  email: string // FIXME: modificar para Value Object Email
  document: string
  password: Password
  phone?: string
  address?: Address
  isActive?: boolean
  lastLoginAt?: Date
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
  get password(): Password {
    return this.props.password
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
  get isActive(): boolean {
    return this.props.isActive ?? true
  }
  get lastLoginAt(): Date | undefined {
    return this.props.lastLoginAt
  }

  changeName(name: string): void {
    if (!name?.trim() || name.length === 0) {
      throw new InvalidCustomerError('Name is required')
    }
    this.props.name = name
    this.touch()
  }
  changePassword(password: Password): void {
    this.props.password = password
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
  activate(): void {
    this.props.isActive = true
    this.touch()
  }
  deactivate(): void {
    this.props.isActive = false
    this.touch()
  }
  registerLogin(): void {
    this.props.lastLoginAt = new Date()
    this.touch()
  }

  touch(): void {
    this.props.updatedAt = new Date()
  }
  toJSON(): {
    id: string
    name: string
    email: string
    document: string
    phone: string | undefined
    address: Address | undefined
    isActive: boolean
    createdAt: Date
    updatedAt: Date
  } {
    return {
      id: this.id.toString(),
      name: this.name,
      email: this.email,
      document: this.document,
      phone: this.phone,
      address: this.address ?? undefined,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  private validate(): void {
    const violations: string[] = []

    if (!this.props.name?.trim()) violations.push('Nome obrigatório')

    if (!this.props.email?.includes('@')) violations.push('Email inválido')

    if (!this.props.document?.trim()) violations.push('Documento obrigatório')

    if (violations.length > 0) {
      throw new InvalidFieldsCustomerError(violations)
    }
  }

  static create(props: CustomerProps, id?: UniqueEntityId): Customer {
    return new Customer(props, id)
  }
}
