import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryRequestDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  user_id: string;
}
