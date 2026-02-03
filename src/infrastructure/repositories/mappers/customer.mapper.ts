import { UniqueEntityId } from '../../../core/UniqueEntityId'
import { Customer } from '../../../domain/entities/customer/customer.entity'
import { Address } from '../../../domain/entities/customer/value-object/address.vo'
import { Password } from '../../../domain/entities/customer/value-object/password-hash.vo'

export class CustomerMapper {
  static toDomain(raw: any): Customer {
    return Customer.create(
      {
        name: raw.name,
        email: raw.email,
        document: raw.document,
        phone: raw.phone || undefined,
        password: Password.fromHashed(raw.password),
        address: raw.address
          ? new Address({
              street: raw.address.street,
              number: raw.address.number,
              complement: raw.address.complement,
              neighborhood: raw.address.neighborhood,
              city: raw.address.city,
              state: raw.address.state,
              zipCode: raw.address.zipCode,
              country: raw.address.country,
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
      phone: customer.phone,
      password: customer.password.toValue(),
      isActive: customer.isActive,
      lastLoginAt: customer.lastLoginAt,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      address: customer.address
        ? {
            create: {
              street: customer.address.toValue().street,
              number: customer.address.toValue().number,
              complement: customer.address.toValue().complement,
              neighborhood: customer.address.toValue().neighborhood,
              city: customer.address.toValue().city,
              state: customer.address.toValue().state,
              zipCode: customer.address.toValue().zipCode,
              country: customer.address.toValue().country,
            },
          }
        : undefined,
    }
  }
}
