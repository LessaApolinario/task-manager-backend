import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6' })
  id: string;

  @ApiProperty({ example: 'Admin' })
  name: string;

  @ApiProperty({ example: 'User' })
  last_name: string;

  @ApiProperty({ example: 'admin@email.com' })
  email: string;
}
