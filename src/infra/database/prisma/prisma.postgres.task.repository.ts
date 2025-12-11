import { Injectable } from '@nestjs/common';
import type { DefaultIdResponse } from '../../../domain/@types/DefaultIdResponse';
import type { CreateTaskRequestDto } from '../../../domain/@types/dto/task/CreateTaskRequestDto';
import type { UpdateTaskRequestDto } from '../../../domain/@types/dto/task/UpdateTaskRequestDto';
import { ResourceAlreadyExistsError } from '../../../domain/errors/ResourceAlreadyExistsError';
import { ResourceNotFoundError } from '../../../domain/errors/ResourceNotFoundError';
import { TaskRepository } from '../../../domain/interfaces/respositories/TaskRepository';
import { PrismaTaskMapper } from '../../../domain/mappers/prisma/prisma.task.mapper';
import type { Task } from '../../../domain/models/Task';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaPostgresTaskRepository extends TaskRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(task: CreateTaskRequestDto): Promise<DefaultIdResponse> {
    const foundTask = await this.prisma.task.findFirst({
      where: { title: task.title, userId: task.user_id },
    });

    if (foundTask) {
      throw new ResourceAlreadyExistsError('Task already exists');
    }

    const createdTask = await this.prisma.task.create({
      data: PrismaTaskMapper.createDtoToPrismaTask(task),
    });

    return {
      id: createdTask.id,
    };
  }

  async update(category: UpdateTaskRequestDto): Promise<Task> {
    const foundTask = await this.prisma.task.findUnique({
      where: { id: category.id },
    });

    if (!foundTask) {
      throw new ResourceNotFoundError('Task not found');
    }

    const updatedTask = await this.prisma.task.update({
      where: { id: category.id },
      data: PrismaTaskMapper.updateDtoToPrismaTask(category),
    });

    return PrismaTaskMapper.toTaskModel(updatedTask);
  }

  async remove(id: string): Promise<Task> {
    const deletedTask = await this.prisma.task.delete({
      where: { id },
    });

    return PrismaTaskMapper.toTaskModel(deletedTask);
  }

  async fetchByUserId(userId: string): Promise<Task[]> {
    const prismaTasks = await this.prisma.task.findMany({
      where: { userId },
    });

    return prismaTasks.map((prismaTask) => {
      return PrismaTaskMapper.toTaskModel(prismaTask);
    });
  }

  async fetchByCategoryId(categoryId: string): Promise<Task[]> {
    const prismaTasks = await this.prisma.task.findMany({
      where: { categoryId },
    });

    return prismaTasks.map((prismaTask) => {
      return PrismaTaskMapper.toTaskModel(prismaTask);
    });
  }

  async findBy(id: string): Promise<Task | null> {
    const foundTask = await this.prisma.task.findUnique({
      where: { id },
    });

    return foundTask ? PrismaTaskMapper.toTaskModel(foundTask) : null;
  }
}
