import type { AuthResponseDto } from '../../@types/dto/auth/AuthResponseDto';
import type { LoginRequestDto } from '../../@types/dto/auth/LoginResquestDto';
import type { User } from '../../models/User';

export abstract class AuthUseCase {
  abstract login(credentials: LoginRequestDto): Promise<AuthResponseDto>;
  abstract validateUser(credentials: LoginRequestDto): Promise<User | null>;
}
