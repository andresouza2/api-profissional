import { CustomerRepository } from '@domain/repositories/customer/customer.repository'
import { Customer } from '@domain/entities/customer/customer.entity'
import { prisma } from '@infrastructure/repositories/lib/prisma'
import { CustomerMapper } from '@infrastructure/repositories/mappers/customer.mapper'

export class CustomerRepositoryImpl extends CustomerRepository {
  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await prisma.customers.findUnique({
      where: { email },
      include: {
        address: true,
      },
    })

    if (!customer) return null

    return CustomerMapper.toDomain({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      document: customer.document,
      phone: customer.phone || null,
      password: customer.password,
      address: customer.address || null,
      isActive: customer.isActive,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    })
  }
  async findById(id: string): Promise<Customer | null> {
    const customer = await prisma.customers.findUnique({
      where: { id },
      include: {
        address: true,
      },
    })

    if (!customer) return null

    return CustomerMapper.toDomain({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      document: customer.document,
      phone: customer.phone || null,
      password: customer.password,
      address: customer.address || null,
      isActive: customer.isActive,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    })
  }
  async save(customer: Customer): Promise<void> {
    const customerExists = await prisma.customers.findUnique({
      where: { id: customer.id.toValue() },
    })

    if (customerExists) {
      // UPDATE: apenas atualizar cliente, endereço separadamente
      await prisma.customers.update({
        where: { id: customer.id.toValue() },
        data: {
          name: customer.name,
          email: customer.email,
          document: customer.document,
          phone: customer.phone,
          password: customer.password.toValue(),
          isActive: customer.isActive,
          lastLoginAt: customer.lastLoginAt,
          updatedAt: customer.updatedAt,
        },
      })

      // Atualizar ou criar endereço
      if (customer.address) {
        const address = customer.address.toValue()
        await prisma.addresses.upsert({
          where: { customerId: customer.id.toValue() },
          create: {
            customerId: customer.id.toValue(),
            street: address.street,
            number: address.number,
            complement: address.complement,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            country: address.country,
          },
          update: {
            street: address.street,
            number: address.number,
            complement: address.complement,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            country: address.country,
          },
        })
      }
    } else {
      // CREATE: criar cliente com endereço
      await prisma.customers.create({
        data: {
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
        },
      })
    }
  }
  async findAll(): Promise<Customer[]> {
    const customers = await prisma.customers.findMany({
      include: {
        address: true,
      },
    })

    return customers.map((customer) =>
      CustomerMapper.toDomain({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        document: customer.document,
        phone: customer.phone || null,
        address: customer.address || null,
        isActive: customer.isActive,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      }),
    )
  }
}
