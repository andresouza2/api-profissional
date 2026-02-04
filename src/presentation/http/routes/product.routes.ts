import { Router } from 'express'
import { makeCreateProductController } from '@presentation/http/factories/make-create-product-controller'
import { makeAuthMiddleware } from '@presentation/http/factories/make-auth-middleware'
import { adapterExpressMiddleware } from '@presentation/http/adapter/expressMiddleware'
import { validateRequest } from '../middleware/validate.middleware'
import { CreateProductSchema } from '../schemas/product/product.schema'

const productRoutes = Router()

productRoutes.post(
  '/products',
  [adapterExpressMiddleware(makeAuthMiddleware()), validateRequest(CreateProductSchema)],
  makeCreateProductController(),
)

export { productRoutes }
