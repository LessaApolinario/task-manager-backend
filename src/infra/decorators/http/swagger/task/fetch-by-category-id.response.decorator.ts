import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Task } from '../../../../../domain/models/Task';
import { ErrorResponse } from '../../../../../domain/@types/http/ErrorResonse';

export function FetchTasksByCategoryIdApiResponse() {
  return applyDecorators(
    ApiOkResponse({
      type: Task,
      isArray: true,
      description: 'Tarefas buscadas com sucesso',
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
