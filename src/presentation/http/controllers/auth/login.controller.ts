import { LoginUseCase } from '../../../../application/use-cases/auth/login.use-case'
import { DomainError } from '../../../../core/errors/domain-error'
import { HttpRequest } from '../../request/http-request'
import { HttpResponse } from '../../response/HttpResponse'
import { badRequest, ok } from '../../response/HttpResponses'
import { LoginInput } from '../../schemas/login.schema'

export class LoginController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async handle(req: HttpRequest<LoginInput>): Promise<HttpResponse> {
    if (!req.body) return badRequest({ message: 'Dados de login são obrigatórios' })

    try {
      const { email, password } = req.body

      const loginResult = await this.loginUseCase.execute({
        email,
        password,
      })

      return ok(loginResult)
    } catch (error) {
      if (error instanceof DomainError) {
        return badRequest({ message: error.message, code: error.code })
      }
      console.log(error)
      return badRequest({ message: 'Erro ao realizar login' })
    }
  }
}
