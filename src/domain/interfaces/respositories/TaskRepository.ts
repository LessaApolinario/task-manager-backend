import type { DefaultIdResponse } from '../../@types/DefaultIdResponse';
import type { CreateTaskRequestDto } from '../../@types/dto/task/CreateTaskRequestDto';
import type { UpdateTaskRequestDto } from '../../@types/dto/task/UpdateTaskRequestDto';
import type { Task } from '../../models/Task';

export abstract class TaskRepository {
  abstract create(task: CreateTaskRequestDto): Promise<DefaultIdResponse>;
  abstract update(category: UpdateTaskRequestDto): Promise<Task>;
  abstract remove(id: string): Promise<Task>;
  abstract fetchByUserId(userId: string): Promise<Task[]>;
  abstract fetchByCategoryId(categoryId: string): Promise<Task[]>;
  abstract findBy(id: string): Promise<Task | null>;
}
