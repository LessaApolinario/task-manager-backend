import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { UpdateTaskRequestDto } from '../../../../../domain/@types/dto/task/UpdateTaskRequestDto';

export function UpdateTaskApiRequest() {
  return applyDecorators(
    ApiOperation({ summary: 'Atualizar uma tarefa' }),
    ApiBody({
      type: UpdateTaskRequestDto,
      description: 'Payload para atualização de tarefa',
    }),
  );
}
