import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

export function LoginApiRequest() {
  return applyDecorators(
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
        example: {
          email: 'admin@email.com',
          password: 'somePasswordFrom2008',
        },
      },
      description: 'Login credentials',
    }),
  );
}
