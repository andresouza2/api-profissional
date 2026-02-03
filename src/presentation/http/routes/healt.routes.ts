import { Router } from 'express'
import { HealthController } from '@presentation/http/controllers/health.controller'

const healthRouter = Router()

healthRouter.get('/health', new HealthController().handle)
export default healthRouter
