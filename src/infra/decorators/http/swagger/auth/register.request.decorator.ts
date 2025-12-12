import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { RegisterRequestDto } from '../../../../../domain/@types/dto/auth/ResgisterRequestDto';

export function RegisterUserApiRequest() {
  return applyDecorators(
    ApiBody({
      type: RegisterRequestDto,
      description: 'Dados para criação de um novo usuário',
    }),
  );
}
