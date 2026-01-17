import { User } from '../../domain/entities/user/user.entity'
import { Email } from '../../domain/value-objects/email.vo'

export abstract class UserRepository {
  abstract findByEmail(email: Email): Promise<User | null>
  abstract save(user: User): Promise<void>
}
