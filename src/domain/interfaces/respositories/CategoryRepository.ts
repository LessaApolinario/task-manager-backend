import type { DefaultIdResponse } from '../../@types/DefaultIdResponse';
import type { CreateCategoryRequestDto } from '../../@types/dto/category/CreateCategoryRequestDto';
import type { UpdateCategoryRequestDto } from '../../@types/dto/category/UpdateCategoryRequestDto';
import type { Category } from '../../models/Category';

export abstract class CategoryRepository {
  abstract create(
    category: CreateCategoryRequestDto,
  ): Promise<DefaultIdResponse>;
  abstract update(category: UpdateCategoryRequestDto): Promise<Category>;
  abstract remove(id: string): Promise<Category>;
  abstract fetchByUserId(user_id: string): Promise<Category[]>;
  abstract findByUserIdAndName(
    userId: string,
    name: string,
  ): Promise<Category | null>;
}
