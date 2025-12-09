import { Module } from '@nestjs/common';
import { AuthUseCase } from '../../domain/interfaces/usecases/AuthUseCase';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AuthUseCase,
      useClass: AuthService,
    },
  ],
  exports: [AuthUseCase, AuthService],
})
export class AuthModule {}
