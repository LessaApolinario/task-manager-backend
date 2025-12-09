import { Module } from '@nestjs/common';

import { AuthUseCase } from '../interfaces/usecases/AuthUseCase';

import { DatabaseModule } from '../database/database.module';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthUseCase,
      useClass: AuthService,
    },
    AuthService,
  ],
  exports: [AuthService, AuthUseCase],
})
export class AuthModule {}
