import { Router } from 'express'
import { makeCreateCustomerController } from '../factories/makeCreateCustomerController'
import { validateRequest } from '../middleware/validate.middleware'
import { CreateCustomerSchema } from '../schemas/customer.schema'

const customerRoutes = Router()
customerRoutes.post('/customers', validateRequest(CreateCustomerSchema), makeCreateCustomerController())
// customerRoutes.post('/customers', makeCreateCustomerController)

export { customerRoutes }
