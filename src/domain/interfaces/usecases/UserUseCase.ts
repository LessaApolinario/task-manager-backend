import type { RegisterRequestDto } from '../../@types/dto/auth/ResgisterRequestDto';
import type { User } from '../../models/User';

export abstract class UserUseCase {
  abstract register(user: RegisterRequestDto): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
}
