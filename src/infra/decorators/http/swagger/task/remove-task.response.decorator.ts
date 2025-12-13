import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from '../../../../../domain/@types/http/ErrorResonse';
import { Task } from '../../../../../domain/models/Task';

export function RemoveTaskApiResponse() {
  return applyDecorators(
    ApiOkResponse({
      type: Task,
      description: 'Tarefa removida com sucesso',
    }),
    ApiNotFoundResponse({
      type: ErrorResponse,
      description: 'Tarefa não encontrada',
      example: {
        statusCode: 404,
        error: 'ResourceNotFoundError',
        message: 'Task not found',
      },
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
