import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

export function UpdateCategoryApiRequest() {
  return applyDecorators(
    ApiBody({
      description: 'Payload para atualizar uma categoria',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          color: { type: 'string' },
          user_id: { type: 'string', format: 'uuid' },
        },
        example: {
          id: 'b350c037-85d8-4221-9db8-6fdc564b0e57',
          name: 'Novo nome',
          color: '#FF00FF',
          user_id: '2f9b605a-9c46-4e32-af3a-fd3e766d7a93',
        },
      },
    }),
  );
}
