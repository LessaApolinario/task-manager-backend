import type { User } from '../../models/User';

export abstract class UserUseCase {
  abstract findByEmail(email: string): Promise<User | null>;
}
