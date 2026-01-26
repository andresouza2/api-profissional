import { Customer } from '../../../domain/entities/customer/customer.entity'
import { CustomerRepository } from '../../repositories/customer/customer.repository'

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(customer: Customer): Promise<Customer> {
    await this.customerRepository.create(customer)
    return customer
  }
}
