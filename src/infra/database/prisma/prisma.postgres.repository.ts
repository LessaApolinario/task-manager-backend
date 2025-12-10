import { Injectable } from '@nestjs/common';
import type { AuthResponseDto } from '../../../domain/@types/dto/auth/AuthResponseDto';
import type { LoginRequestDto } from '../../../domain/@types/dto/auth/LoginResquestDto';
import type { RegisterRequestDto } from '../../../domain/@types/dto/auth/ResgisterRequestDto';
import { NotAllowedError } from '../../../domain/errors/NotAllowedError';
import { ResourceNotFoundError } from '../../../domain/errors/ResourceNotFoundError';
import { AuthRepository } from '../../../domain/interfaces/respositories/AuthRepository';
import type { User } from '../../../domain/models/User';
import { comparePassword } from '../../utils/password';
import { generateUserToken } from '../../utils/token';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaPostgresRepository implements AuthRepository {
  constructor(private prisma: PrismaService) {}

  async login(credentials: LoginRequestDto): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const passwordHash = user?.passwordHash ?? '';
    const isPasswordCorrect = comparePassword(
      credentials.password,
      passwordHash,
    );

    if (!isPasswordCorrect) {
      throw new NotAllowedError();
    }

    const token = generateUserToken({ id: user.id });

    return { token };
  }

  register(user: RegisterRequestDto): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
