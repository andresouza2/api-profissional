import { HashService } from '@domain/services/hash.service'
import { TokenService } from '@domain/services/token.service'
import { CustomerRepository } from '@domain/repositories/customer/customer.repository'
import { Address } from '@domain/entities/customer/value-object'
import { CustomerInactiveError, InvalidCredentialsError } from '@domain/entities/customer/errors'

type AddressOutput = Omit<Address, 'customerId' | 'createdAt' | 'updatedAt'> | undefined

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
    address: AddressOutput
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
      throw new CustomerInactiveError()
    }

    const passwordMatches = await this.hashService.compare(password, customer.password.toValue())
    if (!passwordMatches) {
      throw new InvalidCredentialsError()
    }

    customer.registerLogin()
    await this.customerRepository.save(customer)

    const accessToken = await this.tokenService.sign({
      sub: customer.id.toValue(),
      email: customer.email,
      role: 'CUSTOMER',
    })

    let address: AddressOutput
    if (customer.address?.toValue()) {
      const addressValue = customer.address.toValue()
      address = addressValue as unknown as Omit<Address, 'customerId' | 'createdAt' | 'updatedAt'>
    }

    return {
      accessToken,
      customer: {
        id: customer.id.toValue(),
        name: customer.name,
        email: customer.email,
        document: customer.document,
        address,
      },
    }
  }
}
