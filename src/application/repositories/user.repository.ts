import { User } from '../../domain/entities/user/user.entity'

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>
  abstract save(user: User): Promise<void>
}
