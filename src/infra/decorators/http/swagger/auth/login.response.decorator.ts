import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthResponseDto } from '../../../../../domain/@types/dto/auth/AuthResponseDto';
import { ErrorResponse } from '../../../../../domain/@types/http/ErrorResonse';

export function LoginApiResponse() {
  return applyDecorators(
    ApiOkResponse({
      type: AuthResponseDto,
      description: 'Login bem-sucedido',
    }),
    ApiBadRequestResponse({
      type: ErrorResponse,
      description: 'Payload inválido',
      example: {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Validation failed',
      },
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
