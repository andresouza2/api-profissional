import { UserAlreadyExistsError } from '../../../core/errors/auth.errors'
import { User } from '../../../domain/entities/user/user.entity'
import { Email } from '../../../domain/value-objects/email.vo'
import { Password } from '../../../domain/value-objects/password-hash.vo'
import { UserRepository } from '../../repositories/user.repository'
import { HashService } from '../../services/hash.service'

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface RegisterOutput {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashedService: HashService,
  ) {}

  async execute(input: RegisterInput): Promise<RegisterOutput> {
    const { name, email, password } = input

    const emailVO = Email.create(email)

    const existsUser = await this.userRepository.findByEmail(emailVO.toValue())

    if (existsUser) {
      throw new UserAlreadyExistsError()
    }

    const passwordVO = Password.create(password)
    const hashedPassword = await this.hashedService.hash(passwordVO.toValue())

    const user = User.create({
      name,
      email: emailVO,
      password: Password.fromHashed(hashedPassword),
    })

    await this.userRepository.save(user)

    return {
      user: {
        id: user.id.toValue(),
        name: user.name,
        email: user.email.toValue(),
        role: user.role,
      },
    }
  }
}
