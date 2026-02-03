import { FindByIDCustomerUseCase } from '@application/use-cases/customer/find-by-id-customer.use-case'
import { CustomerRepositoryImpl } from '@infrastructure/repositories/customer.repository'
import { adapterExpressRoute } from '@presentation/http/adapter/expressAdapter'
import { FindByIdCustomerController } from '@presentation/http/controllers/customer/find-by-id-customer.controller'

export function makeFindByIdCustomerController() {
  const customerRepository = new CustomerRepositoryImpl()
  const useCase = new FindByIDCustomerUseCase(customerRepository)
  const controller = new FindByIdCustomerController(useCase)

  return adapterExpressRoute(controller)
}
