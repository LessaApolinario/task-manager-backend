import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function LoginApiResponse() {
  return applyDecorators(
    ApiResponse({
      description: 'Login bem-sucedido',
      schema: {
        type: 'object',
        properties: {
          access_token: { type: 'string' },
        },
        example: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        },
      },
      status: 200,
    }),
    ApiBadRequestResponse({
      description: 'Credenciais inválidas',
      schema: {
        allOf: [
          {
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
        ],
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Token inválido ou não enviado',
      schema: {
        example: {
          statusCode: 401,
          error: 'NotAllowedError | Unauthorized',
          message: 'Not allowed',
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Recurso não encontrado',
      schema: {
        example: {
          statusCode: 404,
          error: 'ResourceNotFoundError',
          message: 'Resource not found',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Erro inesperado',
      schema: {
        allOf: [
          {
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
        ],
      },
    }),
  );
}
