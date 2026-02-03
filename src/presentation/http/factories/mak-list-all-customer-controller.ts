import { CustomerRepositoryImpl } from '@infrastructure/repositories/customer.repository'
import { adapterExpressRoute } from '@presentation/http/adapter/expressAdapter'
import { ListAllCustomerController } from '@presentation/http/controllers/customer/list-all-customer.controller'
import { ListAllCustomerUseCase } from '@application/use-cases/customer/list-all-customer.use-case'

export function makeListAllCustomerController() {
  const customerRepository = new CustomerRepositoryImpl()
  const useCase = new ListAllCustomerUseCase(customerRepository)
  const controller = new ListAllCustomerController(useCase)

  return adapterExpressRoute(controller)
}
