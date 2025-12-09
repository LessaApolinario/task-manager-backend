import type { AuthResponseDto } from '../../@types/dto/auth/AuthResponseDto';
import type { LoginRequestDto } from '../../@types/dto/auth/LoginResquestDto';
import type { RegisterRequestDto } from '../../@types/dto/auth/ResgisterRequestDto';
import type { User } from '../../models/User';

export abstract class AuthRepository {
  abstract login(credentials: LoginRequestDto): Promise<AuthResponseDto>;
  abstract register(user: RegisterRequestDto): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}
