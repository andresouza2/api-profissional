import { User } from '../../domain/entities/user.entity'
import { Email } from '../../domain/value-objects/email.vo'

export abstract class UserRepository {
  abstract findByEmail(email: Email): Promise<User | null>
}
