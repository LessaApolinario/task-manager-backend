import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { TaskUseCase } from '../../domain/interfaces/usecases/TaskUseCase';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
    TaskService,
    {
      provide: TaskUseCase,
      useClass: TaskService,
    },
  ],
  controllers: [TaskController],
  exports: [TaskUseCase, TaskService],
})
export class TaskModule {}
