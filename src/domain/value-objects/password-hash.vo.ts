export class Password {
  private readonly value: string
  private readonly isHashed: boolean

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
    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters long')
    }
    if (!/[A-Z]/.test(password)) {
      throw new Error('Password must contain at least one uppercase letter')
    }
    if (!/[a-z]/.test(password)) {
      throw new Error('Password must contain at least one lowercase letter')
    }
    if (!/\d/.test(password)) {
      throw new Error('Password must contain at least one digit')
    }
    if (!/[\W_]/.test(password)) {
      throw new Error('Password must contain at least one special character')
    }
  }

  toValue(): string {
    return this.value
  }

  isPasswordHashed(): boolean {
    return this.isHashed
  }
}
