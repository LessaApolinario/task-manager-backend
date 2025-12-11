import { TaskStatus as PrismaTaskStatus } from '../../../../generated/prisma/enums';
import { TaskStatus } from '../../@types/enums/TaskStatus';

export class PrismaTaskStatusMapper {
  static prismaTaskStatusToDomainTaskStatus(
    prismaTaskStatus: PrismaTaskStatus,
  ): TaskStatus {
    switch (prismaTaskStatus) {
      case PrismaTaskStatus.PENDING:
        return TaskStatus.PENDING;
      case PrismaTaskStatus.IN_PROGRESS:
        return TaskStatus.IN_PROGRESS;
      case PrismaTaskStatus.COMPLETED:
        return TaskStatus.COMPLETED;
      default:
        return TaskStatus.PENDING;
    }
  }

  static taskStatusToPrismaTaskStatus(
    taskStatus: TaskStatus,
  ): PrismaTaskStatus {
    switch (taskStatus) {
      case TaskStatus.PENDING:
        return PrismaTaskStatus.PENDING;
      case TaskStatus.IN_PROGRESS:
        return PrismaTaskStatus.IN_PROGRESS;
      case TaskStatus.COMPLETED:
        return PrismaTaskStatus.COMPLETED;
      default:
        return PrismaTaskStatus.PENDING;
    }
  }
}
