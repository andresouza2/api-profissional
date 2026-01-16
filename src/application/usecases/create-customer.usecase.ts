import { Customer } from '../../domain/entities/customer.entity'
import { CustomerRepository } from '../../domain/repositories/customer.repository'

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(input: Customer): Promise<void> {
    // TODO: implement customer creation logic

    await this.customerRepository.create(input)
    console.log('Creating customer with input', input)
  }
}
