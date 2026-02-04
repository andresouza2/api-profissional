import { z } from 'zod'

const TIME = 1000 * 60 * 5 // 5 minutos

const envSchema = z.object({
  NODE_ENV: z.string().default(''),

  PORT: z.coerce.number().default(3030),
  JWT_SECRET: z.string().min(10, {
    message: 'JWT_SECRET deve ter no mínimo 10 caracteres',
  }),
  JWT_EXPIRES_IN: z.string().default(TIME.toString()),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Erro ao validar variáveis de ambiente:')
  console.error(parsed.error.format())
  throw new Error('Variáveis de ambiente inválidas')
}

export const env = parsed.data
