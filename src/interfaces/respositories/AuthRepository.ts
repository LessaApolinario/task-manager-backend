import type { AuthResponseDto } from '../../../src/@types/dto/auth/AuthResponseDto';
import type { LoginRequestDto } from '../../../src/@types/dto/auth/LoginResquestDto';
import type { RegisterRequestDto } from '../../../src/@types/dto/auth/ResgisterRequestDto';

import type { User } from '../../../src/domain/models/User';

export abstract class AuthRepository {
  abstract login(credentials: LoginRequestDto): Promise<AuthResponseDto>;
  abstract register(user: RegisterRequestDto): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}
