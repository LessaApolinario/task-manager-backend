import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function CreateTaskApiResponse() {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'Tarefa criada com sucesso',
      schema: {
        type: 'object',
        properties: { id: { type: 'string' } },
        example: { id: 'task-123' },
      },
    }),
    ApiConflictResponse({
      description: 'Esta tarefa já existe',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          error: { type: 'string' },
          message: { type: 'string' },
        },
        example: {
          statusCode: 409,
          error: 'ResourceAlreadyExistsError',
          message: 'Task already exists',
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
    ApiBadRequestResponse({
      description: 'Payload inválido',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          error: { type: 'string' },
          message: { type: 'string' },
        },
        example: {
          statusCode: 400,
          error: 'BadRequestException',
          message: 'Validation failed',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Unexpected error',
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
