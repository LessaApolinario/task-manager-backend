import { Module } from '@nestjs/common';
import { CategoryRepository } from '../../domain/interfaces/respositories/CategoryRepository';
import { UserRepository } from '../../domain/interfaces/respositories/UserRepository';
import { PrismaPostgresCategoryRepository } from './prisma/prisma.postgres.category.repository';
import { PrismaPostgresUserRepository } from './prisma/prisma.postgres.user.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    PrismaPostgresUserRepository,
    PrismaPostgresCategoryRepository,
    {
      provide: UserRepository,
      useClass: PrismaPostgresUserRepository,
    },
    {
      provide: CategoryRepository,
      useClass: PrismaPostgresCategoryRepository,
    },
  ],
  exports: [
    PrismaService,
    PrismaPostgresUserRepository,
    UserRepository,
    PrismaPostgresCategoryRepository,
    CategoryRepository,
  ],
})
export class DatabaseModule {}
