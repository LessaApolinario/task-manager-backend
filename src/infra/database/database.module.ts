import { Module } from '@nestjs/common';
import { AuthRepository } from '../../domain/interfaces/respositories/AuthRepository';
import { PrismaPostgresRepository } from './prisma/prisma.postgres.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: AuthRepository,
      useClass: PrismaPostgresRepository,
    },
  ],
  exports: [PrismaService, AuthRepository],
})
export class DatabaseModule {}
