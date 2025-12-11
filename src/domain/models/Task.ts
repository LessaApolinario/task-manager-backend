import { TaskPriority } from '../@types/enums/TaskPriority';
import { TaskStatus } from '../@types/enums/TaskStatus';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  userId: string;
  categoryId?: string | null;
  createdAt: string;
  updatedAt: string;
}
