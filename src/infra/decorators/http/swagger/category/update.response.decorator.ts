import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function UpdateCategoryApiResponse() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Categoria atualizada com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          color: { type: 'string' },
          user_id: { type: 'string' },
        },
        example: {
          id: 'b350c037-85d8-4221-9db8-6fdc564b0e57',
          name: 'Work',
          color: '#00FFAA',
          user_id: '2f9b605a-9c46-4e32-af3a-fd3e766d7a93',
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
    ApiNotFoundResponse({
      description: 'Recurso não encontrado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          error: { type: 'string' },
          message: { type: 'string' },
        },
        example: {
          statusCode: 404,
          error: 'ResourceNotFoundError',
          message: 'Resource not found',
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
