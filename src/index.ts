import express from 'express'
import dotenv from 'dotenv'
import path from 'node:path'

const env = process.env.NODE_ENV || 'development'

const envFile = `.env.${env}`

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
})

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' })
})

// console.log('🔧 Ambiente carregado:', NODE_ENV)
console.log('Ambiente: ', env)
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
