import { HashService } from '@domain/services/hash.service'
import { InvalidPasswordError } from '@domain/entities/customer/errors'

export class Password {
  private readonly value: string
  private readonly isHashed: boolean

  private constructor(password: string, isHashed: boolean) {
    this.value = password
    this.isHashed = isHashed
  }

  static async create(password: string, hashService: HashService): Promise<Password> {
    Password.validate(password)
    const hashedPassword = await hashService.hash(password)
    return new Password(hashedPassword, true)
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

  async hash(hashService: HashService): Promise<Password> {
    if (this.isHashed) {
      return this
    }
    const hashedValue = await hashService.hash(this.value)
    return new Password(hashedValue, true)
  }

  async compare(plainPassword: string, hashService: HashService): Promise<boolean> {
    return hashService.compare(plainPassword, this.value)
  }

  toValue(): string {
    return this.value
  }
}
