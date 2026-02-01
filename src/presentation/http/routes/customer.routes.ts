import { Router } from 'express'
import { makeCreateCustomerController } from '../factories/makeCreateCustomerController'
import { validateRequest } from '../middleware/validate.middleware'
import { CreateCustomerSchema } from '../schemas/customer.schema'
import { makeListAllCustomerController } from '../factories/makListAllCustomerController'

const customerRoutes = Router()
customerRoutes.get('/customers', makeListAllCustomerController())
customerRoutes.post('/customers', validateRequest(CreateCustomerSchema), makeCreateCustomerController())

export { customerRoutes }
