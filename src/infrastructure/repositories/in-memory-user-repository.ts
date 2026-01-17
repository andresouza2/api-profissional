import { UserRepository } from '../../application/repositories/user.repository'
import { User } from '../../domain/entities/user/user.entity'

export class InMemoryUserRepository extends UserRepository {
  private readonly users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email.toValue() === email) ?? null
    return user
  }
  async save(user: User): Promise<void> {
    this.users.push(user)
  }
}
