import z from 'zod'

export const CreateCustomerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.email('Email inválido'),
  document: z.string().length(11, 'Documento deve ter 11 caracteres'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  address: z
    .object({
      street: z.string(),
      number: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
      neighborhood: z.string(),
      complement: z.string().optional(),
      country: z.string(),
    })
    .optional(),
})

export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>
