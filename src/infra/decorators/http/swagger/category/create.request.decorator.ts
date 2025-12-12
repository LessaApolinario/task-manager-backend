import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

export function CreateCategoryApiRequest() {
  return applyDecorators(
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          color: { type: 'string' },
          user_id: { type: 'string', format: 'uuid' },
        },
        example: {
          name: 'Estudar',
          color: '#FFAA00',
          user_id: '2f9b605a-9c46-4e32-af3a-fd3e766d7a93',
        },
      },
      description: 'Payload para criar uma nova categoria',
    }),
  );
}
