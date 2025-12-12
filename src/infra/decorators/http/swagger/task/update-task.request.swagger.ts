import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { TaskPriority } from '../../../../../domain/@types/enums/TaskPriority';
import { TaskStatus } from '../../../../../domain/@types/enums/TaskStatus';

export function UpdateTaskApiRequest() {
  return applyDecorators(
    ApiOperation({ summary: 'Atualizar uma tarefa' }),
    ApiBody({
      description: 'Payload para atualização de tarefa',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string', nullable: true },
          priority: { type: 'string', enum: Object.values(TaskPriority) },
          status: { type: 'string', enum: Object.values(TaskStatus) },
          user_id: { type: 'string' },
          category_id: { type: 'string', nullable: true },
        },
        example: {
          id: 'task-123',
          title: 'Atualizar documentação da API',
          description: 'Melhorar a documentação da API para o projeto X',
          priority: 'MEDIUM',
          status: 'IN_PROGRESS',
          user_id: 'user-123',
          category_id: 'cat-123',
        },
      },
    }),
  );
}
