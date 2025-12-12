import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function RemoveTaskApiResponse() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Tarefa removida com sucesso',
      schema: {
        type: 'object',
        example: {
          id: 'task-123',
          title: 'Some task',
          description: 'Some description',
          priority: 'LOW',
          status: 'COMPLETED',
          user_id: 'user-123',
          category_id: null,
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Tarefa não encontrada',
      schema: {
        type: 'object',
        example: {
          statusCode: 404,
          error: 'ResourceNotFoundError',
          message: 'Task not found',
        },
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
