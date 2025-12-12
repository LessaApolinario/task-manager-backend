import { DefaultIdResponse } from '../../@types/DefaultIdResponse';
import { CreateCategoryRequestDto } from '../../@types/dto/category/CreateCategoryRequestDto';
import { UpdateCategoryRequestDto } from '../../@types/dto/category/UpdateCategoryRequestDto';
import { Category } from '../../models/Category';

export abstract class CategoryUseCase {
  abstract create(
    category: CreateCategoryRequestDto,
  ): Promise<DefaultIdResponse>;
  abstract update(category: UpdateCategoryRequestDto): Promise<Category>;
  abstract remove(id: string): Promise<Category>;
  abstract fetchByUserId(userId: string): Promise<Category[]>;
  abstract findByUserIdAndName(
    userId: string,
    name: string,
  ): Promise<Category | null>;
}
