import { Customer } from '../entities/customer.entity'

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>
}
