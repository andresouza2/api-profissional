import { compare, hash } from 'bcrypt'
import { HashService } from '../../application/services/hash.service'

export class BcryptHashService extends HashService {
  private readonly SALT_ROUNDS = 10

  async hash(value: string): Promise<string> {
    return hash(value, this.SALT_ROUNDS)
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return compare(value, hashed)
  }
}
