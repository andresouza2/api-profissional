import {
  CreateCustomerDTO,
  CreateCustomerUseCase,
} from '../../../../application/use-cases/customer/create-customer.use-case'
import { DomainError } from '../../../../core/errors/domain-error'
import { HttpRequest } from '../../request/http-request'
import { HttpResponse } from '../../response/HttpResponse'
import { badRequest, created } from '../../response/HttpResponses'

type CreateCustomerRequest = CreateCustomerDTO

export class CreateCustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  async handle(req: HttpRequest<CreateCustomerRequest>): Promise<HttpResponse> {
    if (!req.body) return badRequest({ message: 'Dados do cliente são obrigatórios' })

    try {
      const { name, email, address, document, phone, password } = req.body

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
      return badRequest({ message: 'Erro ao criar cliente' })
    }
  }
}
