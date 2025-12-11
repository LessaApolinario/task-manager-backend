import { Task as PrismaTask } from '../../../../generated/prisma/client';
import type { CreateTaskRequestDto } from '../../@types/dto/task/CreateTaskRequestDto';
import type { UpdateTaskRequestDto } from '../../@types/dto/task/UpdateTaskRequestDto';
import type { Task } from '../../models/Task';
import { PrismaTaskPriorityMapper } from './prisma.task-priority.mapper';
import { PrismaTaskStatusMapper } from './prisma.task-status.mapper';

export class PrismaTaskMapper {
  static toTaskModel(prismaTask: PrismaTask): Task {
    return {
      id: prismaTask.id,
      title: prismaTask.title,
      description: prismaTask.description ?? '',
      status: PrismaTaskStatusMapper.prismaTaskStatusToDomainTaskStatus(
        prismaTask.status,
      ),
      priority: PrismaTaskPriorityMapper.prismaTaskPriorityToDomainTaskPriority(
        prismaTask.priority,
      ),
      userId: prismaTask.userId,
      categoryId: prismaTask.categoryId ?? '',
      createdAt: prismaTask.createdAt.toISOString(),
      updatedAt: prismaTask.updatedAt.toISOString(),
    };
  }

  static createDtoToPrismaTask(
    task: CreateTaskRequestDto,
  ): Omit<PrismaTask, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      title: task.title,
      description: task.description ?? '',
      status: PrismaTaskStatusMapper.taskStatusToPrismaTaskStatus(task.status),
      priority: PrismaTaskPriorityMapper.taskPriorityToPrismaTaskPriority(
        task.priority,
      ),
      userId: task.user_id,
      categoryId: task.category_id ?? '',
    };
  }

  static updateDtoToPrismaTask(
    task: UpdateTaskRequestDto,
  ): Omit<PrismaTask, 'createdAt' | 'updatedAt'> {
    return {
      id: task.id,
      title: task.title,
      description: task.description ?? '',
      status: PrismaTaskStatusMapper.taskStatusToPrismaTaskStatus(task.status),
      priority: PrismaTaskPriorityMapper.taskPriorityToPrismaTaskPriority(
        task.priority,
      ),
      userId: task.user_id,
      categoryId: task.category_id ?? '',
    };
  }
}
