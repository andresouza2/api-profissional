import { Customer } from '../../domain/entities/customer.entity'
import { CustomerRepository } from '../../domain/repositories/customer.repository'

export class CustomerRepositoryImpl extends CustomerRepository {
  private readonly customers: Customer[] = []

  async create(customer: Customer): Promise<void> {
    // TODO: implement customer creation logic
    this.customers.push(customer)
    console.log('Customer created:', customer)
  }
}
