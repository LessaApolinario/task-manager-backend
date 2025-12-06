import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';

@Module({
  imports: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
