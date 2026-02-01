import { DomainError } from '../../../../core/errors/domain-error'

export class CustomerAlreadyExistsError extends DomainError {
  readonly code = 'CUSTOMER_ALREADY_EXISTS'

  constructor() {
    super('Customer already exists')
  }
}

export class CustomerNotFoundError extends DomainError {
  readonly code = 'CUSTOMER_NOT_FOUND'

  constructor(message?: string) {
    super(message ?? 'Customer not found')
  }
}

export class InvalidCustomerError extends DomainError {
  readonly code = 'INVALID_CUSTOMER'

  constructor(message?: string) {
    super(message ?? 'invalid field for customer')
  }
}

export class InvalidFieldsCustomerError extends DomainError {
  readonly code = 'INVALID_FIELDS_CUSTOMER'
  readonly violations: string[]

  constructor(violations: string[]) {
    super(`Campos inválidos para o cliente: ${violations.join(', ')}`)
    this.violations = violations
  }
}

export class InvalidPasswordError extends DomainError {
  readonly code = 'INVALID_PASSWORD'
  readonly violations: string[]

  constructor(violations: string[]) {
    super(`Senha inválida: ${violations.join(', ')}`)
    this.violations = violations
  }
}

export class InvalidAddressError extends DomainError {
  readonly code = 'INVALID_ADDRESS'
  readonly violations: string[]

  constructor(violations: string[]) {
    super(`Endereço inválido: ${violations.join(', ')}`)
    this.violations = violations
  }
}
