import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty({ example: 'Admin' })
  name: string;

  @ApiProperty({ example: 'User' })
  last_name: string;

  @ApiProperty({ example: 'admin@email.com' })
  email: string;

  @ApiProperty({ example: 'somePasswordFrom2008' })
  password: string;
}
