import { Router } from 'express'
import { customerRoutes } from './customer.routes'
import healthRouter from './healt.routes'
import { profileRoutes } from './profile.routes'
import { productRoutes } from './product.routes'

const router = Router()

router.use('/api/v1', healthRouter)
router.use('/api/v1', customerRoutes)
router.use('/api/v1', profileRoutes)
router.use('/api/v1', productRoutes)

export { router }
