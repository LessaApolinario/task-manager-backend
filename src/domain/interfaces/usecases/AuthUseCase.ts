import type { AuthResponseDto } from '../../@types/dto/auth/AuthResponseDto';
import type { LoginRequestDto } from '../../@types/dto/auth/LoginResquestDto';
import type { RegisterRequestDto } from '../../@types/dto/auth/ResgisterRequestDto';
import type { User } from '../../models/User';

export abstract class AuthUseCase {
  abstract login(credentials: LoginRequestDto): Promise<AuthResponseDto>;
  abstract register(user: RegisterRequestDto): Promise<User>;
  abstract validateUser(credentials: LoginRequestDto): Promise<User | null>;
}
