import { Injectable } from '@nestjs/common';

import type { AuthResponseDto } from 'src/@types/dto/auth/AuthResponseDto.js';
import type { LoginRequestDto } from 'src/@types/dto/auth/LoginResquestDto.js';
import type { RegisterRequestDto } from 'src/@types/dto/auth/ResgisterRequestDto.js';

import type { User } from 'src/domain/models/User.js';

import type { AuthUseCase } from 'src/interfaces/usecases/AuthUseCase.js';

import type { AuthRepository } from 'src/interfaces/respositories/AuthRepository.js';

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
