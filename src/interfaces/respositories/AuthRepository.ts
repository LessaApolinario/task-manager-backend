import type { AuthResponseDto } from 'src/@types/dto/auth/AuthResponseDto.js';
import type { LoginRequestDto } from 'src/@types/dto/auth/LoginResquestDto.js';
import type { RegisterRequestDto } from 'src/@types/dto/auth/ResgisterRequestDto.js';

import type { User } from 'src/domain/models/User.js';

export abstract class AuthRepository {
  abstract login(credentials: LoginRequestDto): Promise<AuthResponseDto>;
  abstract register(user: RegisterRequestDto): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}
