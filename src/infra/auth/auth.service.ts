import { Injectable } from '@nestjs/common';
import type { AuthResponseDto } from '../../domain/@types/dto/auth/AuthResponseDto';
import type { LoginRequestDto } from '../../domain/@types/dto/auth/LoginResquestDto';
import type { RegisterRequestDto } from '../../domain/@types/dto/auth/ResgisterRequestDto';
import { AuthRepository } from '../../domain/interfaces/respositories/AuthRepository';
import { AuthUseCase } from '../../domain/interfaces/usecases/AuthUseCase';
import type { User } from '../../domain/models/User';

@Injectable()
export class AuthService implements AuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  login(credentials: LoginRequestDto): Promise<AuthResponseDto> {
    return this.authRepository.login(credentials);
  }

  register(user: RegisterRequestDto): Promise<void> {
    return this.authRepository.register(user);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.authRepository.findByEmail(email);
  }
}
