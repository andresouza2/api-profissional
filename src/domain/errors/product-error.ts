import { DomainError } from '@/core/errors/domain-error'

export class ProductError extends DomainError {
  readonly code = 'PRODUCT_ERROR'

  constructor(message?: string) {
    super(message ?? 'Product error occurred')
  }
}
export class InvalidProductError extends DomainError {
  readonly code = 'INVALID_PRODUCT_ERROR'
  readonly violations: string[]

  constructor(violations: string[]) {
    super(`Campos inválidos para o produto: ${violations.join(', ')}`)
    this.violations = violations
  }
}
