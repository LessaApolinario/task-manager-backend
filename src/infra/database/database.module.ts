import { Module } from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/respositories/UserRepository';
import { PrismaPostgresUserRepository } from './prisma/prisma.postgres.user.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    PrismaPostgresUserRepository,
    {
      provide: UserRepository,
      useClass: PrismaPostgresUserRepository,
    },
  ],
  exports: [PrismaService, PrismaPostgresUserRepository, UserRepository],
})
export class DatabaseModule {}
