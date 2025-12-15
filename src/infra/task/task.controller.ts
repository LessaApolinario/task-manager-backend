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
import { ApiTags } from '@nestjs/swagger';
import {
  createTaskSchema,
  updateTaskSchema,
  type CreateTaskSchema,
  type UpdateTaskSchema,
} from '../../domain/@types/http/task.schemas';
import { TaskUseCase } from '../../domain/interfaces/usecases/TaskUseCase';
import { ZodTaskMapper } from '../../domain/mappers/zod/zod-task.mapper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SwaggerAuth } from '../decorators/http/swagger/auth/swagger-auth.decorator';
import { CreateTaskApiRequest } from '../decorators/http/swagger/task/create-task.request.decorator';
import { CreateTaskApiResponse } from '../decorators/http/swagger/task/create-task.response.decorator';
import { FetchTasksByCategoryIdApiResponse } from '../decorators/http/swagger/task/fetch-by-category-id.response.decorator';
import { FetchTasksByUserIdApiResponse } from '../decorators/http/swagger/task/fetch-by-user-id.response.decorator';
import { RemoveTaskApiResponse } from '../decorators/http/swagger/task/remove-task.response.decorator';
import { UpdateTaskApiRequest } from '../decorators/http/swagger/task/update-task.request.decorator';
import { UpdateTaskApiResponse } from '../decorators/http/swagger/task/update-task.response.decorator';
import { ZodValidationPipe } from '../pipes/ZodValidationPipe';

@ApiTags('task')
@Controller('/task')
export class TaskController {
  constructor(private taskUseCase: TaskUseCase) {}

  @Post('/create')
  @HttpCode(201)
  @SwaggerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createTaskSchema))
  @CreateTaskApiRequest()
  @CreateTaskApiResponse()
  async create(@Body() task: CreateTaskSchema) {
    return this.taskUseCase.create(ZodTaskMapper.zodTaskToCreateTaskDto(task));
  }

  @Put('/update')
  @HttpCode(200)
  @SwaggerAuth()
  @UseGuards(JwtAuthGuard)
  @UpdateTaskApiRequest()
  @UpdateTaskApiResponse()
  @UsePipes(new ZodValidationPipe(updateTaskSchema))
  async update(@Body() task: UpdateTaskSchema) {
    return this.taskUseCase.update(ZodTaskMapper.zodTaskToUpdateTaskDto(task));
  }

  @Delete('/remove/:id')
  @HttpCode(200)
  @SwaggerAuth()
  @UseGuards(JwtAuthGuard)
  @RemoveTaskApiResponse()
  async remove(@Param('id') id: string) {
    return this.taskUseCase.remove(id);
  }

  @Get('/tasks/user/:user_id')
  @HttpCode(200)
  @SwaggerAuth()
  @UseGuards(JwtAuthGuard)
  @FetchTasksByUserIdApiResponse()
  async fetchByUserId(@Param('user_id') userId: string) {
    return this.taskUseCase.fetchByUserId(userId);
  }

  @Get('/tasks/category/:category_id')
  @HttpCode(200)
  @SwaggerAuth()
  @UseGuards(JwtAuthGuard)
  @FetchTasksByCategoryIdApiResponse()
  async fetchByCategoryId(@Param('category_id') categoryId: string) {
    return this.taskUseCase.fetchByCategoryId(categoryId);
  }
}
