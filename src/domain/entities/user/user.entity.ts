import { AggregateRoot } from '../../../core/AggregateRoot'
import { UniqueEntityId } from '../../../core/UniqueEntityId'
import { Email } from '../../value-objects/email.vo'
import { Password } from '../../value-objects/password-hash.vo'

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

interface UserProps {
  name: string
  email: Email // Email (vo)
  password: Password // Hashed password (vo)
  role?: UserRole
  isActive?: boolean
  lastLoginAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

export class User extends AggregateRoot<UserProps> {
  constructor(props: UserProps, id?: UniqueEntityId) {
    super(
      {
        ...props,
        role: props.role ?? UserRole.USER,
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
  get email(): Email {
    return this.props.email
  }
  get password(): Password {
    return this.props.password
  }
  get role(): UserRole {
    return this.props.role!
  }
  get isActive(): boolean {
    return this.props.isActive!
  }
  get lastLoginAt(): Date | undefined {
    return this.props.lastLoginAt
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
  changePassword(password: Password): void {
    this.props.password = password
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
  changeRole(role: UserRole): void {
    this.props.role = role
    this.touch()
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  private validate(): void {
    if (!this.props.name || this.props.name.trim().length < 2) {
      throw new Error('Nome deve ter no mínimo 2 caracteres')
    }
  }

  toJSON() {
    return {
      id: this.id.toValue(),
      name: this.name,
      email: this.email.toValue(),
      role: this.role,
      isActive: this.isActive,
      lastLoginAt: this.lastLoginAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  static create(props: UserProps, id?: UniqueEntityId): User {
    return new User(props, id)
  }
}
