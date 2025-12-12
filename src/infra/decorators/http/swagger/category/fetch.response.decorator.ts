import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function FetchCategoriesApiResponse() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Lista de categorias do usuário',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            color: { type: 'string' },
            user_id: { type: 'string' },
          },
        },
        example: [
          {
            id: '123',
            name: 'Work',
            color: '#FFAA00',
            user_id: 'uuid',
          },
          {
            id: '456',
            name: 'Study',
            color: '#00AAFF',
            user_id: 'uuid',
          },
        ],
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
