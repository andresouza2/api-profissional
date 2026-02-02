import { Customer } from '../../../domain/entities/customer/customer.entity'
import { CustomerNotFoundError, InvalidCustomerError } from '../../../domain/entities/customer/errors'
import { CustomerRepository } from '../../repositories/customer/customer.repository'

export class FindByIDCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id: string): Promise<Customer> {
    if (id.trim().length === 0) throw new InvalidCustomerError('ID is required')

    const customer = await this.customerRepository.findById(id)

    if (!customer) throw new CustomerNotFoundError('Customer not found!')

    return customer
  }
}
