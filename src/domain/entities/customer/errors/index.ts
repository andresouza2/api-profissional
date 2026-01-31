import { DomainError } from '../../../../core/errors/domain-error'

export class CustomerAlreadyExistsError extends DomainError {
  readonly code = 'CUSTOMER_ALREADY_EXISTS'

  constructor() {
    super('Customer already exists')
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
