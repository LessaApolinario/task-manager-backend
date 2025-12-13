import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority } from '../../enums/TaskPriority';
import { TaskStatus } from '../../enums/TaskStatus';

export class CreateTaskRequestDto {
  @ApiProperty({ example: 'Criar documentação da API' })
  title: string;

  @ApiProperty({
    required: false,
    default: '',
    example: 'Escrever a documentação da API para o projeto X',
  })
  description?: string;

  @ApiProperty({
    required: false,
    enum: TaskPriority,
    default: 'MEDIUM',
    example: 'HIGH',
  })
  priority: TaskPriority;

  @ApiProperty({
    required: false,
    enum: TaskStatus,
    default: 'PENDING',
    example: 'PENDING',
  })
  status: TaskStatus;

  @ApiProperty({ example: '2f9b605a-9c46-4e32-af3a-fd3e766d7a93' })
  user_id: string;

  @ApiProperty({
    required: false,
    nullable: true,
    default: null,
    example: 'cat-123',
  })
  category_id?: string | null;
}
