import { Module } from '@nestjs/common';
import { CategoryRepository } from '../../domain/interfaces/respositories/CategoryRepository';
import { TaskRepository } from '../../domain/interfaces/respositories/TaskRepository';
import { UserRepository } from '../../domain/interfaces/respositories/UserRepository';
import { PrismaPostgresCategoryRepository } from './prisma/prisma.postgres.category.repository';
import { PrismaPostgresTaskRepository } from './prisma/prisma.postgres.task.repository';
import { PrismaPostgresUserRepository } from './prisma/prisma.postgres.user.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    PrismaPostgresUserRepository,
    PrismaPostgresCategoryRepository,
    PrismaPostgresTaskRepository,
    {
      provide: UserRepository,
      useClass: PrismaPostgresUserRepository,
    },
    {
      provide: CategoryRepository,
      useClass: PrismaPostgresCategoryRepository,
    },
    {
      provide: TaskRepository,
      useClass: PrismaPostgresTaskRepository,
    },
  ],
  exports: [
    PrismaService,
    PrismaPostgresUserRepository,
    UserRepository,
    PrismaPostgresCategoryRepository,
    CategoryRepository,
    PrismaPostgresTaskRepository,
    TaskRepository,
  ],
})
export class DatabaseModule {}
