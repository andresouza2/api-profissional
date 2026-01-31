import { InvalidPasswordError } from '../errors'

export class Password {
  private readonly value: string
  private readonly isHashed: boolean

  // FIXME: add hashing logic
  private constructor(password: string, isHashed: boolean) {
    this.value = password
    this.isHashed = isHashed
  }

  static create(password: string): Password {
    Password.validate(password)
    return new Password(password, false)
  }

  static fromHashed(hashedPassword: string): Password {
    return new Password(hashedPassword, true)
  }

  static validate(password: string): void {
    const violations: string[] = []

    if (!password || password.length < 8) {
      violations.push('pelo menos 8 caracteres')
    }
    if (!/[A-Z]/.test(password)) {
      violations.push('pelo menos uma letra maiúscula')
    }
    if (!/[a-z]/.test(password)) {
      violations.push('pelo menos uma letra minúscula')
    }
    if (!/\d/.test(password)) {
      violations.push('pelo menos um dígito')
    }
    if (!/[\W_]/.test(password)) {
      violations.push('pelo menos um caractere especial')
    }

    if (violations.length > 0) {
      throw new InvalidPasswordError(violations)
    }
  }

  toValue(): string {
    return this.value
  }

  isPasswordHashed(): boolean {
    return this.isHashed
  }
}
