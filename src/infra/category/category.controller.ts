import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { CategoryUseCase } from '../../domain/interfaces/usecases/CategoryUseCase';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ZodValidationPipe } from '../pipes/ZodValidationPipe';

const createCategorySchema = z.object({
  name: z.string(),
  color: z.string(),
  user_id: z.uuid(),
});

type CreateCategorySchema = z.infer<typeof createCategorySchema>;

const updateCategorySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  color: z.string(),
  user_id: z.uuid(),
});

type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;

@Controller('/category')
export class CategoryController {
  constructor(private categoryUseCase: CategoryUseCase) {}

  @Post('/create')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createCategorySchema))
  create(@Body() category: CreateCategorySchema) {
    return this.categoryUseCase.create(category);
  }

  @Patch('/update')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(updateCategorySchema))
  update(@Body() category: UpdateCategorySchema) {
    return this.categoryUseCase.update(category);
  }

  @Get('/categories/:user_id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  fetchByUserId(@Param('user_id') user_id: string) {
    return this.categoryUseCase.fetchByUserId(user_id);
  }

  @Delete('/remove/:id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.categoryUseCase.remove(id);
  }
}
