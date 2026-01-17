import { UserRepository } from '../../repositories/user.repository'
import { HashService } from '../../services/hash.service'
import { TokenService } from '../../services/token.service'
import { Email } from '../../../domain/value-objects/email.vo'
import { InvalidCredentialsError, UserInactiveError } from '../../../core/errors/auth.errors'

export interface LoginInput {
  email: string
  password: string
}
export interface LoginOutput {
  accessToken: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const { email, password } = input

    const newEmail = Email.create(email).toValue()

    const user = await this.userRepository.findByEmail(newEmail)

    if (!user) {
      throw new InvalidCredentialsError()
    }
    if (!user.isActive) {
      throw new UserInactiveError()
    }

    const passwordMatches = await this.hashService.compare(password, user.password.toValue())

    if (!passwordMatches) {
      throw new InvalidCredentialsError()
    }

    user.registerLogin()
    await this.userRepository.save(user)

    const accessToken = this.tokenService.sign({
      sub: user.id.toValue(),
      email: user.email.toValue(),
      role: user.role,
    })

    return {
      accessToken,
      user: {
        id: user.id.toValue(),
        name: user.name,
        email: user.email.toValue(),
        role: user.role,
      },
    }
  }
}
