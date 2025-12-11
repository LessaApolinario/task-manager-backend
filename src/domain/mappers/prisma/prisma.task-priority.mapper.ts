import { TaskPriority as PrismaTaskPriority } from '../../../../generated/prisma/client';
import { TaskPriority } from '../../@types/enums/TaskPriority';

export class PrismaTaskPriorityMapper {
  static taskPriorityToPrismaTaskPriority(
    taskPriority: TaskPriority,
  ): PrismaTaskPriority {
    switch (taskPriority) {
      case TaskPriority.LOW:
        return PrismaTaskPriority.LOW;
      case TaskPriority.MEDIUM:
        return PrismaTaskPriority.MEDIUM;
      case TaskPriority.HIGH:
        return PrismaTaskPriority.HIGH;
      default:
        return PrismaTaskPriority.MEDIUM;
    }
  }

  static prismaTaskPriorityToDomainTaskPriority(
    prismaTaskPriority: PrismaTaskPriority,
  ): TaskPriority {
    switch (prismaTaskPriority) {
      case PrismaTaskPriority.LOW:
        return TaskPriority.LOW;
      case PrismaTaskPriority.MEDIUM:
        return TaskPriority.MEDIUM;
      case PrismaTaskPriority.HIGH:
        return TaskPriority.HIGH;
      default:
        return TaskPriority.MEDIUM;
    }
  }
}
