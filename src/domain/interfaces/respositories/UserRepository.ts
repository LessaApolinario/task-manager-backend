import type { User } from '../../models/User';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
}
