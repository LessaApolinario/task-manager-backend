import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority } from '../@types/enums/TaskPriority';
import { TaskStatus } from '../@types/enums/TaskStatus';

export class Task {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, default: '' })
  description?: string;

  @ApiProperty({ required: false, enum: TaskPriority, default: 'MEDIUM' })
  priority: TaskPriority;

  @ApiProperty({ required: false, enum: TaskStatus, default: 'PENDING' })
  status: TaskStatus;

  @ApiProperty()
  userId: string;

  @ApiProperty({ required: false, nullable: true, default: null })
  categoryId?: string | null;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
