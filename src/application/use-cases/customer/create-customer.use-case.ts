import { CustomerAlreadyExistsError } from '../../../core/errors/auth.errors'
import { Customer } from '../../../domain/entities/customer/customer.entity'
import { CustomerRepository } from '../../repositories/customer/customer.repository'

export type CreateCustomerDTO = Omit<
  Customer,
  | 'id'
  | 'isActive'
  | 'activate'
  | 'deactivate'
  | 'lastLoginAt'
  | 'changeName'
  | 'changePassword'
  | 'changeAddress'
  | 'createdAt'
  | 'updatedAt'
  | 'changePhone'
  | 'registerLogin'
  | 'toJSON'
  | 'touch'
  | 'validate'
  | 'create'
>

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(data: CreateCustomerDTO): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findByEmail(data.email)
    if (existingCustomer !== null) {
      throw new CustomerAlreadyExistsError()
    }

    const customer = Customer.create(data)

    await this.customerRepository.save(customer)
    return customer
  }
}
