import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test', 'local']).default('development'),

  PORT: z.coerce.number().default(3333),

  // DATABASE_URL: z.string().url({
  //   message: 'DATABASE_URL deve ser uma URL válida',
  // }),

  // JWT_SECRET: z.string().min(10, {
  //   message: 'JWT_SECRET deve ter no mínimo 10 caracteres',
  // }),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Erro ao validar variáveis de ambiente:')
  console.error(parsed.error.format())
  throw new Error('Variáveis de ambiente inválidas')
}

export const env = parsed.data
