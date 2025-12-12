import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { TaskPriority } from '../../../../../domain/@types/enums/TaskPriority';
import { TaskStatus } from '../../../../../domain/@types/enums/TaskStatus';

export function CreateTaskApiRequest() {
  return applyDecorators(
    ApiOperation({ summary: 'Criar uma nova tarefa' }),
    ApiBody({
      description: 'Payload para criação de tarefa',
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string', nullable: true },
          priority: { type: 'string', enum: Object.values(TaskPriority) },
          status: { type: 'string', enum: Object.values(TaskStatus) },
          user_id: { type: 'string' },
          category_id: { type: 'string', nullable: true },
        },
        example: {
          title: 'Criar documentação da API',
          description: 'Escrever a documentação da API para o projeto X',
          priority: 'HIGH',
          status: 'PENDING',
          user_id: 'user-123',
          category_id: 'cat-123',
        },
      },
    }),
  );
}
