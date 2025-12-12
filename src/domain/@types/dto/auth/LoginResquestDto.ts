import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({ example: 'admin@email.com' })
  email: string;

  @ApiProperty({ example: 'somePasswordFrom2008' })
  password: string;
}
