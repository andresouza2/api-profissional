import {
  CreateCustomerDTO,
  CreateCustomerUseCase,
} from '../../../../application/use-cases/customer/create-customer.use-case'
import { DomainError } from '../../../../core/errors/domain-error'
import { HttpResponse } from '../../response/HttpResponse'
import { badRequest, created } from '../../response/HttpResponses'

type CreateCustomerRequest = {
  body: CreateCustomerDTO
}

export class CreateCustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  async handle(req: CreateCustomerRequest): Promise<HttpResponse> {
    const { name, email, address, document, phone, password } = req.body

    try {
      const customerCreate = await this.createCustomerUseCase.execute({
        name,
        email,
        address,
        document,
        phone,
        password,
      })

      const customer = customerCreate

      return created(customer)
    } catch (error) {
      if (error instanceof DomainError) {
        return badRequest({ message: error.message, code: error.code })
      }
      console.log(error)
      return badRequest({ message: 'Erro ao criar cliente' })
    }
  }
}
