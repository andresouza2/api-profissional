import { CustomerNotFoundError, InvalidCustomerError } from '@domain/entities/customer/errors'
import { CustomerRepository } from '@domain/repositories/customer/customer.repository'
import { CustomerOutput } from '@application/use-cases/customer/dto/customer-dto'

export class FindByIDCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id: string): Promise<CustomerOutput> {
    if (id.trim().length === 0) throw new InvalidCustomerError('ID is required')

    const customerRepo = await this.customerRepository.findById(id)

    if (!customerRepo) throw new CustomerNotFoundError('Customer not found!')

    const customerData = customerRepo.toJSON()

    const customer: CustomerOutput = {
      id: customerData.id,
      name: customerData.name,
      email: customerData.email,
      document: customerData.document,
      phone: customerData.phone,
      address: customerData.address
        ? {
            street: customerData.address.toValue().street,
            number: customerData.address.toValue().number,
            complement: customerData.address.toValue().complement,
            neighborhood: customerData.address.toValue().neighborhood,
            city: customerData.address.toValue().city,
            state: customerData.address.toValue().state,
            zipCode: customerData.address.toValue().zipCode,
            country: customerData.address.toValue().country,
          }
        : undefined,
      isActive: customerData.isActive,
      createdAt: customerData.createdAt,
      updatedAt: customerData.updatedAt,
    }

    return customer
  }
}
