import { Customer } from '../../domain/entities/customer.entity'
import { CustomerRepository } from '../../application/repositories/customer.repository'

export class InMemoryCustomerRepository extends CustomerRepository {
  private readonly customers: Customer[] = []

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer)
  }
}
