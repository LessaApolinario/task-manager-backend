import { TaskPriority } from '../../enums/TaskPriority';
import { TaskStatus } from '../../enums/TaskStatus';

export interface CreateTaskRequestDto {
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  user_id: string;
  category_id?: string;
}
