import { Customer } from '../../domain/entities/customer/customer.entity'

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>
}
