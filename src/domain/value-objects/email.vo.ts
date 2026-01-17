export class Email {
  private readonly value: string

  private constructor(email: string) {
    this.value = email
  }

  static create(email: string): Email {
    if (!email?.trim() || !Email.isValid(email)) {
      throw new Error('Invalid email address')
    }

    return new Email(email)
  }

  static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  toValue(): string {
    return this.value
  }

  equals(other: Email): boolean {
    if (!(other instanceof Email)) {
      return false
    }
    return this.value === other.value
  }
}
