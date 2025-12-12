import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateCategoryRequestDto } from '../../../../../domain/@types/dto/category/CreateCategoryRequestDto';
import { ErrorResponse } from '../../../../../domain/@types/http/ErrorResonse';
import { DefaultIdResponse } from '../../../../../domain/@types/DefaultIdResponse';

export function CreateCategoryApiResponse() {
  return applyDecorators(
    ApiCreatedResponse({
      type: DefaultIdResponse,
      description: 'Categoria criada com sucesso',
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
    ApiConflictResponse({
      type: ErrorResponse,
      description: 'Já existe uma categoria com este nome para este usuário',
      example: {
        statusCode: 409,
        error: 'Conflict',
        message: 'Category already exists for this user',
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
