import { CustomerRepository } from '@domain/repositories/customer/customer.repository'
import { CustomerOutput } from '@application/use-cases/customer/dto/customer-dto'

export class ListAllCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(): Promise<CustomerOutput[]> {
    const customers = await this.customerRepository.findAll()

    const response = customers.map((customer) => {
      customer.toJSON()
      return {
        id: customer.id.toValue(),
        name: customer.name,
        email: customer.email,
        document: customer.document,
        phone: customer.phone,
        address: customer.address
          ? {
              street: customer.address.toValue().street,
              number: customer.address.toValue().number,
              complement: customer.address.toValue().complement,
              neighborhood: customer.address.toValue().neighborhood,
              city: customer.address.toValue().city,
              state: customer.address.toValue().state,
              zipCode: customer.address.toValue().zipCode,
              country: customer.address.toValue().country,
            }
          : undefined,
        isActive: customer.isActive,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      }
    })

    return response
  }
}
