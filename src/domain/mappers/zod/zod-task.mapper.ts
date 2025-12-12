import { CreateTaskRequestDto } from '../../@types/dto/task/CreateTaskRequestDto';
import { UpdateTaskRequestDto } from '../../@types/dto/task/UpdateTaskRequestDto';
import type {
  CreateTaskSchema,
  UpdateTaskSchema,
} from '../../@types/http/task.schemas';
import { ZodTaskPriorityMapper } from './zod-task-priority.mapper';
import { ZodTaskStatusMapper } from './zod-task-status.mapper';

export class ZodTaskMapper {
  static zodTaskToCreateTaskDto(
    zodTask: CreateTaskSchema,
  ): CreateTaskRequestDto {
    return {
      title: zodTask.title,
      description: zodTask.description,
      status: ZodTaskStatusMapper.zodTaskStatusToDomainTaskStatus(
        zodTask.status,
      ),
      priority: ZodTaskPriorityMapper.zodTaskPriorityToDomainTaskPriority(
        zodTask.priority,
      ),
      user_id: zodTask.user_id,
      category_id: zodTask.category_id,
    };
  }

  static zodTaskToUpdateTaskDto(
    zodTask: UpdateTaskSchema,
  ): UpdateTaskRequestDto {
    return {
      id: zodTask.id,
      title: zodTask.title,
      description: zodTask.description,
      status: ZodTaskStatusMapper.zodTaskStatusToDomainTaskStatus(
        zodTask.status,
      ),
      priority: ZodTaskPriorityMapper.zodTaskPriorityToDomainTaskPriority(
        zodTask.priority,
      ),
      user_id: zodTask.user_id,
      category_id: zodTask.category_id,
    };
  }
}
