import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { UserUseCase } from '../../domain/interfaces/usecases/UserUseCase';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserService,
    {
      provide: UserUseCase,
      useClass: UserService,
    },
  ],
  exports: [UserUseCase, UserService],
})
export class UserModule {}
