import { CreateCustomerUseCase } from '../../../application/use-cases/customer/create-customer.use-case'
import { CustomerRepositoryImpl } from '../../../infrastructure/repositories/customer.repository'
import { adapterExpressRoute } from '../adapter/expressAdapter'
import { CreateCustomerController } from '../controllers/customer/create-customer-controller'

export function makeCreateCustomerController() {
  const customerRepository = new CustomerRepositoryImpl()
  const useCase = new CreateCustomerUseCase(customerRepository)
  const controller = new CreateCustomerController(useCase)

  return adapterExpressRoute(controller)
}
