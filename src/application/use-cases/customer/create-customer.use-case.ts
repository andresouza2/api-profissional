import { Customer } from '../../../domain/entities/customer/customer.entity'
import { CustomerAlreadyExistsError } from '../../../domain/entities/customer/errors'
import { Address } from '../../../domain/entities/customer/value-object/address.vo'
import { Password } from '../../../domain/entities/customer/value-object/password-hash.vo'
import { CustomerRepository } from '../../repositories/customer/customer.repository'
import { HashService } from '../../services/hash.service'

export type CreateCustomerDTO = {
  name: string
  email: string
  document: string
  password: string
  phone?: string
  address?: Address
}

export class CreateCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly hashService: HashService,
  ) {}

  async execute(data: CreateCustomerDTO): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findByEmail(data.email)

    if (existingCustomer !== null) throw new CustomerAlreadyExistsError()

    const password = await Password.create(data.password, this.hashService)
    const passwordHashed = await password.hash(this.hashService)

    const customer = Customer.create({
      name: data.name,
      email: data.email,
      document: data.document,
      phone: data.phone,
      address: data.address,
      password: passwordHashed,
    })

    await this.customerRepository.save(customer)
    return customer
  }
}
