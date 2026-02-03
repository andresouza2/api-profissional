import { LoginUseCase } from '@application/use-cases/auth/login.use-case'
import { env } from '@config/env.schema'
import { CustomerRepositoryImpl } from '@infrastructure/repositories/customer.repository'
import { BcryptHashService } from '@infrastructure/services/bcrypt-hash-service'
import { JwtTokenService } from '@infrastructure/services/jwt-token-service'
import { adapterExpressRoute } from '@presentation/http/adapter/expressAdapter'
import { LoginController } from '@presentation/http/controllers/auth/login.controller'

export function makeAuthController() {
  const customerRepository = new CustomerRepositoryImpl()
  const hashService = new BcryptHashService()
  const tokenService = new JwtTokenService({
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN || '24h',
  })

  const loginUseCase = new LoginUseCase(customerRepository, hashService, tokenService)
  const authController = new LoginController(loginUseCase)

  return adapterExpressRoute(authController)
}
