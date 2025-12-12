import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { z } from 'zod';
import { CategoryUseCase } from '../../domain/interfaces/usecases/CategoryUseCase';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCategoryApiRequest } from '../decorators/http/swagger/category/create.request.decorator';
import { CreateCategoryApiResponse } from '../decorators/http/swagger/category/create.response.decorator';
import { FetchCategoriesApiResponse } from '../decorators/http/swagger/category/fetch.response.decorator';
import { RemoveCategoryApiResponse } from '../decorators/http/swagger/category/remove.response.decorator';
import { UpdateCategoryApiRequest } from '../decorators/http/swagger/category/update.request.decorator';
import { UpdateCategoryApiResponse } from '../decorators/http/swagger/category/update.response.decorator';
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

@ApiTags('category')
@Controller('/category')
export class CategoryController {
  constructor(private categoryUseCase: CategoryUseCase) {}

  @Post('/create')
  @HttpCode(201)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createCategorySchema))
  @CreateCategoryApiRequest()
  @CreateCategoryApiResponse()
  create(@Body() category: CreateCategorySchema) {
    return this.categoryUseCase.create(category);
  }

  @Put('/update')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(updateCategorySchema))
  @UpdateCategoryApiRequest()
  @UpdateCategoryApiResponse()
  update(@Body() category: UpdateCategorySchema) {
    return this.categoryUseCase.update(category);
  }

  @Get('/categories/:user_id')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @FetchCategoriesApiResponse()
  fetchByUserId(@Param('user_id') user_id: string) {
    return this.categoryUseCase.fetchByUserId(user_id);
  }

  @Delete('/remove/:id')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @RemoveCategoryApiResponse()
  remove(@Param('id') id: string) {
    return this.categoryUseCase.remove(id);
  }
}
