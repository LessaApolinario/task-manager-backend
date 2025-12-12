import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function FetchTasksByCategoryIdApiResponse() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Tarefas buscadas com sucesso',
      schema: {
        type: 'array',
        items: { type: 'object' },
        example: [
          {
            id: 'task-123',
            title: 'Task A',
            priority: 'MEDIUM',
            status: 'PENDING',
            user_id: 'user-1',
            category_id: 'cat-1',
          },
        ],
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Token inválido ou ausente',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          error: { type: 'string' },
          message: { type: 'string' },
        },
        example: {
          statusCode: 401,
          error: 'NotAllowedError | Unauthorized',
          message: 'Unauthorized',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Erro interno do servidor',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          error: { type: 'string' },
          message: { type: 'string' },
        },
        example: {
          statusCode: 500,
          error: 'InternalServerError',
          message: 'Unexpected error',
        },
      },
    }),
  );
}
