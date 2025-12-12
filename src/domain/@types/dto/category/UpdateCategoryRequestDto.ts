import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryRequestDto {
  @ApiProperty({ example: 'b350c037-85d8-4221-9db8-6fdc564b0e57' })
  id: string;

  @ApiProperty({ example: 'Novo nome' })
  name: string;

  @ApiProperty({ example: '#FF00FF' })
  color: string;

  @ApiProperty({ example: '2f9b605a-9c46-4e32-af3a-fd3e766d7a93' })
  user_id: string;
}
