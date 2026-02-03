import { FindByIDCustomerUseCase } from '@application/use-cases/customer/find-by-id-customer.use-case'
import { DomainError } from '@core/errors/domain-error'
import { HttpRequest } from '@presentation/http/request/http-request'
import { HttpResponse } from '@presentation/http/response/HttpResponse'
import { badRequest, ok } from '@presentation/http/response/HttpResponses'

type FindByIdParams = {
  id: string
}

export class FindByIdCustomerController {
  constructor(private readonly findByIdCustomerUseCase: FindByIDCustomerUseCase) {}

  async handle(req: HttpRequest<unknown, FindByIdParams>): Promise<HttpResponse> {
    if (!req.params) return badRequest({ message: 'ID do cliente é obrigatório' })

    try {
      const { id } = req.params
      const customer = await this.findByIdCustomerUseCase.execute(id)
      return ok(customer)
    } catch (error) {
      if (error instanceof DomainError) {
        return badRequest({ message: error.message, code: error.code })
      }
      return badRequest({ message: 'Erro ao buscar cliente' })
    }
  }
}
