import { Customer } from '../../domain/entities/customer/customer.entity'
import { CustomerRepository } from '../../application/repositories/customer.repository'

export class InMemoryCustomerRepository extends CustomerRepository {
  private readonly customers: Customer[] = []

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer)
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.customers.find((customer) => customer.email === email) ?? null
    return customer
  }

  async save(customer: Customer): Promise<void> {
    const index = this.customers.findIndex((c) => c.id.toValue() === customer.id.toValue())
    if (index !== -1) {
      this.customers[index] = customer
    } else {
      this.customers.push(customer)
    }
  }
}
