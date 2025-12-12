import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger';

export function RegisterUserApiResponse() {
  return applyDecorators(
    ApiResponse({
      description: 'Usuário registrado com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        example: { id: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6' },
      },
      status: 201,
    }),
    ApiBadRequestResponse({
      description: 'Dados de registro inválidos',
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
    ApiConflictResponse({
      description: 'Já existe um usuário com esse e-mail',
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
              statusCode: 409,
              error: 'ResourceAlreadyExistsError',
              message: 'User already exists',
            },
          },
        ],
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
