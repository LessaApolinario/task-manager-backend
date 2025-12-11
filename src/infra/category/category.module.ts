import { Module } from '@nestjs/common';
import { CategoryUseCase } from '../../domain/interfaces/usecases/CategoryUseCase';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
    CategoryService,
    {
      provide: CategoryUseCase,
      useClass: CategoryService,
    },
  ],
  exports: [CategoryUseCase, CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
