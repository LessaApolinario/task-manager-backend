import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { DefaultIdResponse } from '../../../../../domain/@types/DefaultIdResponse';
import { ErrorResponse } from '../../../../../domain/@types/http/ErrorResonse';

export function RegisterUserApiResponse() {
  return applyDecorators(
    ApiCreatedResponse({
      type: DefaultIdResponse,
      description: 'Usuário registrado com sucesso',
    }),
    ApiBadRequestResponse({
      type: ErrorResponse,
      description: 'Dados de registro inválidos',
      example: {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Validation failed',
      },
    }),
    ApiConflictResponse({
      type: ErrorResponse,
      description: 'Já existe um usuário com esse e-mail',
      example: {
        statusCode: 409,
        error: 'ResourceAlreadyExistsError',
        message: 'User already exists',
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
