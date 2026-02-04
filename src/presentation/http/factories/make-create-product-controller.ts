import { CreateProductUseCase } from '@application/use-cases/product/create-product.use-case'
import { CustomerRepositoryImpl } from '@infrastructure/repositories/customer.repository'
import { ProductRepositoryImpl } from '@infrastructure/repositories/product.repository'
import { adapterExpressRoute } from '@presentation/http/adapter/expressAdapter'
import { CreateProductController } from '@presentation/http/controllers/product/create-product.controller'

export function makeCreateProductController() {
  const customerRepository = new CustomerRepositoryImpl()
  const productRepository = new ProductRepositoryImpl()
  const useCase = new CreateProductUseCase(customerRepository, productRepository)
  const controller = new CreateProductController(useCase)

  return adapterExpressRoute(controller)
}
