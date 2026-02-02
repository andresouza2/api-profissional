import { Router } from 'express'
import { makeCreateCustomerController } from '../factories/make-create-customer-controller'
import { validateRequest } from '../middleware/validate.middleware'
import { CreateCustomerSchema } from '../schemas/customer.schema'
import { makeListAllCustomerController } from '../factories/mak-list-all-customer-controller'
import { makeFindByIdCustomerController } from '../factories/make-find-by-id-customer-controller'

const customerRoutes = Router()
customerRoutes.get('/customers', makeListAllCustomerController())
customerRoutes.post('/customers', validateRequest(CreateCustomerSchema), makeCreateCustomerController())
customerRoutes.get('/customers/:id', makeFindByIdCustomerController())

export { customerRoutes }
