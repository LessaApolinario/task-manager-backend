import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from '../../../../../domain/@types/http/ErrorResonse';
import { Task } from '../../../../../domain/models/Task';

export function UpdateTaskApiResponse() {
  return applyDecorators(
    ApiOkResponse({
      type: Task,
      description: 'Tarefa atualizada com sucesso',
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
    ApiBadRequestResponse({
      type: ErrorResponse,
      description: 'Payload inválido',
      example: {
        statusCode: 400,
        error: 'BadRequestException',
        message: 'Validation failed',
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
