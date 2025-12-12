import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateCategoryRequestDto } from '../../../../../domain/@types/dto/category/CreateCategoryRequestDto';

export function CreateCategoryApiRequest() {
  return applyDecorators(
    ApiBody({
      type: CreateCategoryRequestDto,
      description: 'Payload para criar uma nova categoria',
    }),
  );
}
