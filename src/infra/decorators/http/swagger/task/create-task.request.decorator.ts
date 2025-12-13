import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateTaskRequestDto } from '../../../../../domain/@types/dto/task/CreateTaskRequestDto';

export function CreateTaskApiRequest() {
  return applyDecorators(
    ApiOperation({ summary: 'Criar uma nova tarefa' }),
    ApiBody({
      type: CreateTaskRequestDto,
      description: 'Payload para criação de tarefa',
    }),
  );
}
