import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function FetchTasksByUserIdApiResponse() {
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
            description: 'desc A',
            priority: 'LOW',
            status: 'PENDING',
            user_id: 'user-123',
            category_id: null,
          },
          {
            id: 'task-456',
            title: 'Task B',
            description: 'desc B',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            user_id: 'user-123',
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
