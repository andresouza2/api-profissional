import { CustomerRepository } from '@domain/repositories/customer/customer.repository'
import { Customer } from '@domain/entities/customer/customer.entity'

export class InMemoryCustomerRepository extends CustomerRepository {
  private readonly customers: Customer[] = []

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.customers.find((customer) => customer.email === email) ?? null
    return customer
  }

  async save(customer: Customer): Promise<void> {
    const index = this.customers.findIndex((c) => c.id.toValue() === customer.id.toValue())
    if (index >= 0) {
      this.customers[index] = customer
    } else {
      this.customers.push(customer)
    }
  }
  async findById(id: string): Promise<Customer | null> {
    const customer = this.customers.find((customer) => customer.id.toValue() === id) ?? null
    return customer
  }

  async findAll(): Promise<Customer[]> {
    return this.customers
  }
}
