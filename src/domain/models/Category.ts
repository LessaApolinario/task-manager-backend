import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;
}
