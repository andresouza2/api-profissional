export interface CreateProductInput {
  customerId: string
  name: string
  description: string
  sku: string
  price: number
  stock: number
  currency: string
}

export interface ProductOutput {
  id: string
  name: string
  description: string
  sku: string
  price: number
  stock: number
  currency: string
}

export interface CreateProductDTO {
  name: string
  description: string
  sku: string
  price: number
  stock: number
  currency: string
}
