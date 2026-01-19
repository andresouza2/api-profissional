export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials')
    this.name = 'InvalidCredentialsError'
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found')
    this.name = 'UserNotFoundError'
  }
}

export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists')
    this.name = 'UserAlreadyExistsError'
  }
}

export class CustomerAlreadyExistsError extends Error {
  constructor() {
    super('Customer already exists')
    this.name = 'CustomerAlreadyExistsError'
  }
}

export class UserInactiveError extends Error {
  constructor() {
    super('User is inactive')
    this.name = 'UserInactiveError'
  }
}

export class InvalidTokenError extends Error {
  constructor() {
    super('Invalid token')
    this.name = 'InvalidTokenError'
  }
}
