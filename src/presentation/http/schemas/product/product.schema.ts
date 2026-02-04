import z from 'zod'

export const CreateProductSchema = z.object({
  name: z.string().min(3, 'Name must have at least 3 characters'),
  description: z.string().min(10, 'Description must have at least 10 characters'),
  sku: z.string().min(3, 'SKU must have at least 3 characters'),
  price: z.number().positive('Price must be a positive number'),
  stock: z.number().int().nonnegative('Stock must be a non-negative integer'),
  currency: z.string().length(3, 'Currency must be a 3-letter code'),
})

export type CreateProductDTO = z.infer<typeof CreateProductSchema>
