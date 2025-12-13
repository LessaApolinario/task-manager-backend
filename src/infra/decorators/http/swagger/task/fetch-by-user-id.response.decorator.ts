import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from '../../../../../domain/@types/http/ErrorResonse';
import { Task } from '../../../../../domain/models/Task';

export function FetchTasksByUserIdApiResponse() {
  return applyDecorators(
    ApiOkResponse({
      type: Task,
      isArray: true,
      description: 'Tarefas buscadas com sucesso',
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
    }),
    ApiUnauthorizedResponse({
      type: ErrorResponse,
      description: 'Token inválido ou ausente',
      example: {
        statusCode: 401,
        error: 'NotAllowedError | Unauthorized',
        message: 'Unauthorized',
      },
    }),
    ApiInternalServerErrorResponse({
      type: ErrorResponse,
      description: 'Erro interno do servidor',
      example: {
        statusCode: 500,
        error: 'InternalServerError',
        message: 'Unexpected error',
      },
    }),
  );
}
