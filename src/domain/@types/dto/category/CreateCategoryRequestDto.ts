import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryRequestDto {
  @ApiProperty({ example: 'Estudar' })
  name: string;

  @ApiProperty({ example: '#FFAA00' })
  color: string;

  @ApiProperty({ example: '2f9b605a-9c46-4e32-af3a-fd3e766d7a93' })
  user_id: string;
}
