import { TaskPriority } from '../../@types/enums/TaskPriority';

export class ZodTaskPriorityMapper {
  static zodTaskPriorityToDomainTaskPriority(
    zodTaskPriority: string,
  ): TaskPriority {
    switch (zodTaskPriority) {
      case 'LOW':
        return TaskPriority.LOW;
      case 'MEDIUM':
        return TaskPriority.MEDIUM;
      case 'HIGH':
        return TaskPriority.HIGH;
      default:
        return TaskPriority.MEDIUM;
    }
  }

  static domainTaskPriorityToZodTaskPriority(
    taskPriority: TaskPriority,
  ): string {
    switch (taskPriority) {
      case TaskPriority.LOW:
        return 'LOW';
      case TaskPriority.MEDIUM:
        return 'MEDIUM';
      case TaskPriority.HIGH:
        return 'HIGH';
      default:
        return 'MEDIUM';
    }
  }
}
