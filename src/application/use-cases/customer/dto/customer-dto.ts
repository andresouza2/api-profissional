import { Address } from '@/domain/entities/customer/value-object'

export interface CustomerOutput {
  id: string
  name: string
  email: string
  document: string
  phone?: string
  address?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateCustomerDTO {
  name: string
  email: string
  document: string
  password: string
  phone?: string
  address?: Address
}
