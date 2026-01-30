import { Router } from 'express'
import { customerRoutes } from './customer.routes'
import healthRouter from './healt.routes'

const router = Router()

router.use('/api/v1', healthRouter)
router.use('/api/v1', customerRoutes)

export { router }
