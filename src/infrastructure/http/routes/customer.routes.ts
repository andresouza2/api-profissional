import { Router } from 'express'
import { makeCreateCustomerController } from '../factories/makeCreateCustomerController'

const customerRoutes = Router()
customerRoutes.post('/customers', makeCreateCustomerController())

export { customerRoutes }
