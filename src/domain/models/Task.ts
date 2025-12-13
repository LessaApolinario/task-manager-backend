import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority } from '../@types/enums/TaskPriority';
import { TaskStatus } from '../@types/enums/TaskStatus';

export class Task {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6' })
  id: string;

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
  userId: string;

  @ApiProperty({
    required: false,
    nullable: true,
    default: null,
    example: 'b350c037-85d8-4221-9db8-6fdc564b0e57',
  })
  categoryId?: string | null;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  updatedAt: string;
}
