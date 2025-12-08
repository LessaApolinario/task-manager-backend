import { Module } from '@nestjs/common';

import { AuthRepository } from 'src/interfaces/respositories/AuthRepository';

import { PrismaService } from './prisma/prisma.service';

import { PrismaPostgresRepository } from './prisma/prisma.postgres.repository';

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
