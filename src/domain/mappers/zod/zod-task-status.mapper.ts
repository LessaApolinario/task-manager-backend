import { TaskStatus } from '../../@types/enums/TaskStatus';

export class ZodTaskStatusMapper {
  static zodTaskStatusToDomainTaskStatus(zodTaskStatus: string): TaskStatus {
    switch (zodTaskStatus) {
      case 'PENDING':
        return TaskStatus.PENDING;
      case 'IN_PROGRESS':
        return TaskStatus.IN_PROGRESS;
      case 'COMPLETED':
        return TaskStatus.COMPLETED;
      default:
        return TaskStatus.PENDING;
    }
  }

  static domainTaskStatusToZodTaskStatus(taskStatus: TaskStatus): string {
    switch (taskStatus) {
      case TaskStatus.PENDING:
        return 'PENDING';
      case TaskStatus.IN_PROGRESS:
        return 'IN_PROGRESS';
      case TaskStatus.COMPLETED:
        return 'COMPLETED';
      default:
        return 'PENDING';
    }
  }
}
