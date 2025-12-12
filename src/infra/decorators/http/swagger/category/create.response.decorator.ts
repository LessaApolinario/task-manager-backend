import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function CreateCategoryApiResponse() {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'Categoria criada com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
        },
        example: {
          id: 'b350c037-85d8-4221-9db8-6fdc564b0e57',
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
          error: 'Bad Request',
          message: 'Validation failed',
        },
      },
    }),
    ApiConflictResponse({
      description: 'Já existe uma categoria com este nome para este usuário',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          error: { type: 'string' },
          message: { type: 'string' },
        },
        example: {
          statusCode: 409,
          error: 'Conflict',
          message: 'Category already exists for this user',
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
          message: 'Not allowed',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Erro inesperado',
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
