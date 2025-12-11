import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  createTaskSchema,
  updateTaskSchema,
  type CreateTaskSchema,
  type UpdateTaskSchema,
} from '../../domain/@types/http/task.schemas';
import { TaskUseCase } from '../../domain/interfaces/usecases/TaskUseCase';
import { ZodTaskMapper } from '../../domain/mappers/zod/zod-task.mapper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ZodValidationPipe } from '../pipes/ZodValidationPipe';

@Controller('/task')
export class TaskController {
  constructor(private taskUseCase: TaskUseCase) {}

  @Post('/create')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createTaskSchema))
  async create(@Body() task: CreateTaskSchema) {
    return this.taskUseCase.create(ZodTaskMapper.zodTaskToCreateTaskDto(task));
  }

  @Put('/update')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(updateTaskSchema))
  async update(task: UpdateTaskSchema) {
    return this.taskUseCase.update(ZodTaskMapper.zodTaskToUpdateTaskDto(task));
  }

  @Put('/remove/:id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.taskUseCase.remove(id);
  }

  @Get('/tasks/user/:user_id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async fetchByUserId(@Param('user_id') userId: string) {
    return this.taskUseCase.fetchByUserId(userId);
  }

  @Get('/tasks/category/:category_id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async fetchByCategoryId(@Param('category_id') categoryId: string) {
    return this.taskUseCase.fetchByCategoryId(categoryId);
  }
}
