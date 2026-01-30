import { UniqueEntityId } from '../../../core/UniqueEntityId'
import { Customer } from '../../../domain/entities/customer/customer.entity'
import { Address } from '../../../domain/value-objects/address.vo'
import { Password } from '../../../domain/value-objects/password-hash.vo'

export class CustomerMapper {
  static toDomain(raw: any): Customer {
    return Customer.create(
      {
        name: raw.name,
        email: raw.email,
        document: raw.document,
        phone: raw.phone || undefined,
        password: Password.fromHashed(raw.password),
        address: raw.addresses
          ? new Address({
              street: raw.address?.street,
              city: raw.address?.city,
              state: raw.address?.state,
              zipCode: raw.address?.zipCode,
              neighborhood: raw.address?.neighborhood,
              number: raw.address?.number,
              complement: raw.address?.complement,
            })
          : undefined,
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(customer: Customer): any {
    return {
      id: customer.id.toValue(),
      name: customer.name,
      email: customer.email,
      document: customer.document,
      phone: customer.phone ?? '',
      password: customer.password.toValue(),
      address: customer.address
        ? {
            create: customer.address.toValue(),
          }
        : undefined,
      isActive: customer.isActive,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }
  }
}
