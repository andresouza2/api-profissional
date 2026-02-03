export interface CustomerOutput {
  id: string
  name: string
  email: string
  document: string
  phone: string | undefined
  address: {
    street: string
    number: string
    complement: string | undefined
    neighborhood: string
    city: string
    state: string
    zipCode: string
    country: string
  } | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
