import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LoginRequestDto } from '../../../../../domain/@types/dto/auth/LoginResquestDto';

export function LoginApiRequest() {
  return applyDecorators(
    ApiBody({
      type: LoginRequestDto,
      description: 'Credenciais de login',
    }),
  );
}
