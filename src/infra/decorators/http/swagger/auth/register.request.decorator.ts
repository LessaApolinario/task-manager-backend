import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

export function RegisterUserApiRequest() {
  return applyDecorators(
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          last_name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
        },
        example: {
          name: 'Admin',
          last_name: 'User',
          email: 'admin@email.com',
          password: 'somePasswordFrom2008',
        },
      },
      description: 'User registration data',
    }),
  );
}
