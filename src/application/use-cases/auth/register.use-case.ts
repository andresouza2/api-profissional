import { Customer } from '../../../domain/entities/customer/customer.entity'
import { CustomerAlreadyExistsError } from '../../../domain/entities/customer/errors'
import { Password } from '../../../domain/entities/customer/value-object/password-hash.vo'
import { CustomerRepository } from '../../repositories/customer/customer.repository'

import { HashService } from '../../services/hash.service'

export interface RegisterInput {
  name: string
  email: string
  document: string
  password: string
}

export interface RegisterOutput {
  customer: {
    id: string
    name: string
    email: string
    document: string
  }
}

export class RegisterUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly hashedService: HashService,
  ) {}

  async execute(input: RegisterInput): Promise<RegisterOutput> {
    const { name, email, document, password } = input

    const existsCustomer = await this.customerRepository.findByEmail(email)

    if (existsCustomer) {
      throw new CustomerAlreadyExistsError()
    }

    const passwordVO = Password.create(password)
    const hashedPassword = await this.hashedService.hash(passwordVO.toValue())

    const customer = Customer.create({
      name,
      email,
      document,
      password: Password.fromHashed(hashedPassword),
    })

    await this.customerRepository.save(customer)

    return {
      customer: {
        id: customer.id.toValue(),
        name: customer.name,
        email: customer.email,
        document: customer.document,
      },
    }
  }
}
