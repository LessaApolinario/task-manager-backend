import { Injectable } from '@nestjs/common';

import type { AuthResponseDto } from '../../src/@types/dto/auth/AuthResponseDto';
import type { LoginRequestDto } from '../../src/@types/dto/auth/LoginResquestDto';
import type { RegisterRequestDto } from '../../src/@types/dto/auth/ResgisterRequestDto';

import type { User } from '../../src/domain/models/User';

import type { AuthUseCase } from '../interfaces/usecases/AuthUseCase';

import type { AuthRepository } from '../interfaces/respositories/AuthRepository';

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
