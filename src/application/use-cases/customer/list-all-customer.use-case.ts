import { Customer } from '../../../domain/entities/customer/customer.entity'
import { CustomerRepository } from '../../repositories/customer/customer.repository'

export class ListAllCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(): Promise<Customer[]> {
    const customers = await this.customerRepository.findAll()
    return customers
  }
}
