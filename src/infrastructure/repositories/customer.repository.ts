import { CustomerRepository } from '../../application/repositories/customer/customer.repository'
import { Customer } from '../../domain/entities/customer/customer.entity'
import { prisma } from './lib/prisma'
import { CustomerMapper } from './mappers/customer.mapper'

export class CustomerRepositoryImpl extends CustomerRepository {
  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await prisma.customers.findUnique({
      where: { email },
    })

    if (!customer) return null

    return CustomerMapper.toDomain({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      document: customer.document,
      phone: customer.phone || undefined,
      isActive: customer.isActive,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    })
  }
  async findById(id: string): Promise<Customer | null> {
    const customer = await prisma.customers.findUnique({
      where: { id },
    })

    if (!customer) return null

    return CustomerMapper.toDomain({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      document: customer.document,
      phone: customer.phone || undefined,
      isActive: customer.isActive,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    })
  }
  async save(customer: Customer): Promise<void> {
    const data = CustomerMapper.toPrisma(customer)
    await prisma.customers.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    })
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
        phone: customer.phone || undefined,
        address: customer.address || undefined,
        isActive: customer.isActive,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      }),
    )
  }
}
