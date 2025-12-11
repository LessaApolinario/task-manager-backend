import { Injectable } from '@nestjs/common';
import type { DefaultIdResponse } from '../../domain/@types/DefaultIdResponse';
import type { CreateTaskRequestDto } from '../../domain/@types/dto/task/CreateTaskRequestDto';
import type { UpdateTaskRequestDto } from '../../domain/@types/dto/task/UpdateTaskRequestDto';
import { TaskRepository } from '../../domain/interfaces/respositories/TaskRepository';
import { TaskUseCase } from '../../domain/interfaces/usecases/TaskUseCase';
import type { Task } from '../../domain/models/Task';

@Injectable()
export class TaskService extends TaskUseCase {
  constructor(private taskRepository: TaskRepository) {
    super();
  }

  create(task: CreateTaskRequestDto): Promise<DefaultIdResponse> {
    return this.taskRepository.create(task);
  }

  update(category: UpdateTaskRequestDto): Promise<Task> {
    return this.taskRepository.update(category);
  }

  remove(id: string): Promise<Task> {
    return this.taskRepository.remove(id);
  }

  fetchByUserId(userId: string): Promise<Task[]> {
    return this.taskRepository.fetchByUserId(userId);
  }

  fetchByCategoryId(categoryId: string): Promise<Task[]> {
    return this.taskRepository.fetchByCategoryId(categoryId);
  }

  findBy(id: string): Promise<Task | null> {
    return this.taskRepository.findBy(id);
  }
}
