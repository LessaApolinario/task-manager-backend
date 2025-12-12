import { Injectable } from '@nestjs/common';
import { RegisterRequestDto } from '../../../domain/@types/dto/auth/ResgisterRequestDto';
import { ResourceAlreadyExistsError } from '../../../domain/errors/ResourceAlreadyExistsError';
import { UserRepository } from '../../../domain/interfaces/respositories/UserRepository';
import { PrismaUserMapper } from '../../../domain/mappers/prisma/prisma.user.mapper';
import { User } from '../../../domain/models/User';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaPostgresUserRepository extends UserRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async register(user: RegisterRequestDto): Promise<User> {
    const foundPrismaUser = await this.findByEmail(user.email);

    if (foundPrismaUser) {
      throw new ResourceAlreadyExistsError('User already exists');
    }

    const prismaUser = await this.prisma.user.create({
      data: await PrismaUserMapper.createDtoToPrismaUser(user),
    });

    return PrismaUserMapper.toUserModel(prismaUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { email } });
    return prismaUser ? PrismaUserMapper.toUserModel(prismaUser) : null;
  }
}
