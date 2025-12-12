import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password_hash: string;
}
