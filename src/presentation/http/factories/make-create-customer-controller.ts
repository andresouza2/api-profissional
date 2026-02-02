import { CreateCustomerUseCase } from '../../../application/use-cases/customer/create-customer.use-case'
import { CustomerRepositoryImpl } from '../../../infrastructure/repositories/customer.repository'
import { adapterExpressRoute } from '../adapter/expressAdapter'
import { CreateCustomerController } from '../controllers/customer/create-customer.controller'
import { BcryptHashService } from '../../../infrastructure/services/bcrypt-hash-service'

export function makeCreateCustomerController() {
  const customerRepository = new CustomerRepositoryImpl()
  const hashService = new BcryptHashService()
  const useCase = new CreateCustomerUseCase(customerRepository, hashService)
  const controller = new CreateCustomerController(useCase)

  return adapterExpressRoute(controller)
}
