import express from 'express'
import '@config/env'
import { env } from '@config/env.schema'
import { router } from '@presentation/http/routes'

const app = express()

app.use(express.json())

app.use(router)

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
})
