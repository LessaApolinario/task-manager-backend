import { Injectable } from '@nestjs/common';

import type { AuthRepository } from '../../../src/interfaces/respositories/AuthRepository';

import type { PrismaService } from './prisma.service.js';

import type { AuthResponseDto } from '../../../src/@types/dto/auth/AuthResponseDto';
import type { LoginRequestDto } from '../../../src/@types/dto/auth/LoginResquestDto';
import type { RegisterRequestDto } from '../../../src/@types/dto/auth/ResgisterRequestDto';

import { CredentialsError } from '.../../src/errors/CredentialsError';

import type { User } from '../../../src/domain/models/User';

import { ResourceNotFoundError } from '../../../src/errors/ResourceNotFoundError';

import { PrismaAuthMapper } from '../../../src/domain/mappers/prisma/prisma-auth-mapper';

import { comparePassword } from '../../../src/utils/password';
import { generateUserToken } from '../../../src/utils/token';

@Injectable()
export class PrismaPostgresRepository implements AuthRepository {
  constructor(private prisma: PrismaService) {}

  async login(credentials: LoginRequestDto): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new ResourceNotFoundError('User not found');
    }

    const passwordHash = user?.passwordHash ?? '';
    const isPasswordCorrect = comparePassword(
      credentials.password,
      passwordHash,
    );

    if (!isPasswordCorrect) {
      throw new CredentialsError('Password incorrect');
    }

    const tokenPayload = PrismaAuthMapper.toTokenPayload(user);
    const token = generateUserToken(tokenPayload);

    return { token };
  }

  register(user: RegisterRequestDto): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
