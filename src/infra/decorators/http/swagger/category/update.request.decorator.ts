import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UpdateCategoryRequestDto } from '../../../../../domain/@types/dto/category/UpdateCategoryRequestDto';

export function UpdateCategoryApiRequest() {
  return applyDecorators(
    ApiBody({
      type: UpdateCategoryRequestDto,
      description: 'Payload para atualizar uma categoria',
    }),
  );
}
