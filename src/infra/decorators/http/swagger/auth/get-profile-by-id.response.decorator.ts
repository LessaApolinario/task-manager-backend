import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserProfileDto } from '../../../../../domain/@types/dto/auth/UserProfileDto';
import { ErrorResponse } from '../../../../../domain/@types/http/ErrorResonse';

export function GetProfileByIdApiResponse() {
  return applyDecorators(
    ApiOkResponse({
      type: UserProfileDto,
      description: 'Busca de perfil do usuário por id bem-sucedido',
    }),
    ApiUnauthorizedResponse({
      type: ErrorResponse,
      description: 'Token inválido ou ausente',
      example: {
        statusCode: 401,
        error: 'NotAllowedError | Unauthorized',
        message: 'Unauthorized',
      },
    }),
    ApiNotFoundResponse({
      type: ErrorResponse,
      description: 'Perfil não encontrado',
      example: {
        statusCode: 404,
        error: 'ResourceNotFoundError',
        message: 'Profile not found',
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
