import { Injectable } from '@nestjs/common';
import type { UserRepository } from '../../../domain/interfaces/respositories/UserRepository';
import { PrismaUserMapper } from '../../../domain/mappers/prisma/prisma.user.mapper';
import type { User } from '../../../domain/models/User';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaPostgresUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { email } });
    return prismaUser ? PrismaUserMapper.toUserModel(prismaUser) : null;
  }
}
