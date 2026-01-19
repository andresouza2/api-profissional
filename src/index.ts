import express from 'express'
import './config/env'
import { env } from './config/env.schema'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' })
})

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
})
