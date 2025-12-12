import { Category as PrismaCategory } from '../../../../generated/prisma/client';
import { CreateCategoryRequestDto } from '../../@types/dto/category/CreateCategoryRequestDto';
import { UpdateCategoryRequestDto } from '../../@types/dto/category/UpdateCategoryRequestDto';
import { Category } from '../../models/Category';

export class PrismaCategoryMapper {
  static toCategoryModel(prismaCategory: PrismaCategory): Category {
    return {
      id: prismaCategory.id,
      name: prismaCategory.name,
      color: prismaCategory.color,
      user_id: prismaCategory.userId,
      created_at: prismaCategory.createdAt.toISOString(),
      updated_at: prismaCategory.updatedAt.toISOString(),
    };
  }

  static createDtoToPrismaCategory(
    category: CreateCategoryRequestDto,
  ): Omit<PrismaCategory, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      name: category.name,
      color: category.color,
      userId: category.user_id,
    };
  }

  static updateDtoToPrismaCategory(
    category: UpdateCategoryRequestDto,
  ): Omit<PrismaCategory, 'createdAt' | 'updatedAt'> {
    return {
      id: category.id,
      name: category.name,
      color: category.color,
      userId: category.user_id,
    };
  }
}
