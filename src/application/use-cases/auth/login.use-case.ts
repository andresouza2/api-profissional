import { CustomerRepository } from '../../repositories/customer.repository'
import { HashService } from '../../services/hash.service'
import { TokenService } from '../../services/token.service'
import { Email } from '../../../domain/value-objects/email.vo'
import { InvalidCredentialsError, UserInactiveError } from '../../../core/errors/auth.errors'

export interface LoginInput {
  email: string
  password: string
}
export interface LoginOutput {
  accessToken: string
  customer: {
    id: string
    name: string
    email: string
    document: string
  }
}

export class LoginUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const { email, password } = input

    const customer = await this.customerRepository.findByEmail(email)

    if (!customer) {
      throw new InvalidCredentialsError()
    }
    if (!customer.isActive) {
      throw new UserInactiveError()
    }

    const passwordMatches = await this.hashService.compare(password, customer.password.toValue())

    if (!passwordMatches) {
      throw new InvalidCredentialsError()
    }

    customer.registerLogin()
    await this.customerRepository.save(customer)

    const accessToken = this.tokenService.sign({
      sub: customer.id.toValue(),
      email: customer.email,
      role: 'CUSTOMER',
    })

    return {
      accessToken,
      customer: {
        id: customer.id.toValue(),
        name: customer.name,
        email: customer.email,
        document: customer.document,
      },
    }
  }
}
