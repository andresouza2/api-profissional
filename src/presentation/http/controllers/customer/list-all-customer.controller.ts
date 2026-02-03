import { ListAllCustomerUseCase } from '../../../../application/use-cases/customer/list-all-customer.use-case'
import { DomainError } from '../../../../core/errors/domain-error'
import { HttpRequest } from '../../request/http-request'
import { HttpResponse } from '../../response/HttpResponse'
import { badRequest, ok } from '../../response/HttpResponses'

export class ListAllCustomerController {
  constructor(private readonly listAllCustomerUseCase: ListAllCustomerUseCase) {}

  async handle(_: HttpRequest): Promise<HttpResponse> {
    try {
      const customers = await this.listAllCustomerUseCase.execute()
      return ok(customers)
    } catch (error) {
      if (error instanceof DomainError) {
        return badRequest({ message: error.message, code: error.code })
      }
      return badRequest({ message: 'Erro ao listar clientes' })
    }
  }
}
