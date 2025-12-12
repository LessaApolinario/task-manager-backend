import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function UpdateTaskApiResponse() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Tarefa atualizada com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string', nullable: true },
          priority: { type: 'string' },
          status: { type: 'string' },
          user_id: { type: 'string' },
          category_id: { type: 'string', nullable: true },
        },
        example: {
          id: 'task-123',
          title: 'Atualizar documentação da API',
          description: 'Melhorar a documentação da API para o projeto X',
          priority: 'MEDIUM',
          status: 'IN_PROGRESS',
          user_id: 'user-123',
          category_id: 'cat-123',
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Tarefa não encontrada',
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
          message: 'Task not found',
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
      description: 'Erro interno do servidor',
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
