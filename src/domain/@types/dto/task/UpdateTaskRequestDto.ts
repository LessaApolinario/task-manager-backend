import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority } from '../../enums/TaskPriority';
import { TaskStatus } from '../../enums/TaskStatus';

export class UpdateTaskRequestDto {
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
  user_id: string;

  @ApiProperty({ required: false, nullable: true, default: null })
  category_id?: string | null;
}
