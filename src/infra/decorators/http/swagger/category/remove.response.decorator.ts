import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from '../../../../../domain/@types/http/ErrorResonse';
import { Category } from '../../../../../domain/models/Category';

export function RemoveCategoryApiResponse() {
  return applyDecorators(
    ApiOkResponse({
      type: Category,
      description: 'Categoria removida com sucesso',
    }),
    ApiNotFoundResponse({
      type: ErrorResponse,
      description: 'Recurso não encontrado',
      example: {
        statusCode: 404,
        error: 'ResourceNotFoundError',
        message: 'Resource not found',
      },
    }),
    ApiUnauthorizedResponse({
      type: ErrorResponse,
      description: 'Token inválido ou ausente',
      example: {
        statusCode: 401,
        error: 'NotAllowedError | Unauthorized',
        message: 'Not allowed',
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
