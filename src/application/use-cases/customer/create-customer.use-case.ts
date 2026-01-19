import { Customer } from '../../../domain/entities/customer/customer.entity'
import { CustomerRepository } from '../../repositories/customer.repository'

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(input: Customer): Promise<void> {
    await this.customerRepository.create(input)
  }
}
