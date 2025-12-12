import { RegisterRequestDto } from '../../@types/dto/auth/ResgisterRequestDto';
import { User } from '../../models/User';

export abstract class UserUseCase {
  abstract register(user: RegisterRequestDto): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
}
