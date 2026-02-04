import { CreateProductUseCase } from '@application/use-cases/product/create-product.use-case'
import { HttpRequest } from '@presentation/http/request/http-request'
import { HttpResponse } from '@presentation/http/response/HttpResponse'
import { badRequest, created, unauthorized } from '@presentation/http/response/HttpResponses'
import { CreateProductDTO } from '@application/use-cases/product/dto/product-dto'
import { DomainError } from '@/core/errors/domain-error'

export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  async handle(req: HttpRequest<CreateProductDTO>): Promise<HttpResponse> {
    if (!req.body) return badRequest({ message: 'Product data is required' })

    if (!req.user) return unauthorized({ message: 'User not authenticated' })

    try {
      const { name, description, sku, price, stock, currency } = req.body
      const customerId = req.user.id

      const product = await this.createProductUseCase.execute({
        customerId,
        name,
        description,
        sku,
        price,
        stock,
        currency,
      })
      return created(product)
    } catch (error) {
      if (error instanceof DomainError) {
        return badRequest({ message: error.message, code: error.code })
      }
      return badRequest({ message: 'Error creating product' })
    }
  }
}
