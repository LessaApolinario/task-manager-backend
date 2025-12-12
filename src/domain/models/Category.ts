import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6' })
  id: string;

  @ApiProperty({ example: 'Estudos' })
  name: string;

  @ApiProperty({ example: '#FFAA00' })
  color: string;

  @ApiProperty({ example: '2f9b605a-9c46-4e32-af3a-fd3e766d7a93' })
  user_id: string;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  created_at: string;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  updated_at: string;
}
