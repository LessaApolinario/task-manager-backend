import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DefaultIdResponse } from '../../../../../domain/@types/DefaultIdResponse';
import { ErrorResponse } from '../../../../../domain/@types/http/ErrorResonse';

export function CreateTaskApiResponse() {
  return applyDecorators(
    ApiCreatedResponse({
      type: DefaultIdResponse,
      description: 'Tarefa criada com sucesso',
    }),
    ApiConflictResponse({
      type: ErrorResponse,
      description: 'Esta tarefa já existe',
      example: {
        statusCode: 409,
        error: 'ResourceAlreadyExistsError',
        message: 'Task already exists',
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
      description: 'Unexpected error',
      example: {
        statusCode: 500,
        error: 'InternalServerError',
        message: 'Unexpected error',
      },
    }),
  );
}
