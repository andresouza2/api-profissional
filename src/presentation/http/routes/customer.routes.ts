import { Router } from 'express'
import { makeCreateCustomerController } from '@presentation/http/factories/make-create-customer-controller'
import { validateRequest } from '@presentation/http/middleware/validate.middleware'
import { CreateCustomerSchema } from '@presentation/http/schemas/customer.schema'
import { makeListAllCustomerController } from '@presentation/http/factories/mak-list-all-customer-controller'
import { makeFindByIdCustomerController } from '@presentation/http/factories/make-find-by-id-customer-controller'
import { adapterExpressMiddleware } from '../adapter/expressMiddleware'
import { makeAuthMiddleware } from '../factories/make-auth-middleware'

const customerRoutes = Router()
customerRoutes.get('/customers', adapterExpressMiddleware(makeAuthMiddleware()), makeListAllCustomerController())
customerRoutes.post('/customers', validateRequest(CreateCustomerSchema), makeCreateCustomerController())
customerRoutes.get('/customers/:id', adapterExpressMiddleware(makeAuthMiddleware()), makeFindByIdCustomerController())

export { customerRoutes }
