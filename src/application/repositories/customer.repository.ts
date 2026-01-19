import { Customer } from '../../domain/entities/customer/customer.entity.js'

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>
  abstract findByEmail(email: string): Promise<Customer | null>
  abstract save(customer: Customer): Promise<void>
}
