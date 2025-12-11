import { Category as PrismaCategory } from '../../../../generated/prisma/client';
import type { CreateCategoryRequestDto } from '../../@types/dto/category/CreateCategoryRequestDto';
import type { UpdateCategoryRequestDto } from '../../@types/dto/category/UpdateCategoryRequestDto';
import type { Category } from '../../models/Category';

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

  static async createDtoToPrismaCategory(
    category: CreateCategoryRequestDto,
  ): Promise<Omit<PrismaCategory, 'id' | 'createdAt' | 'updatedAt'>> {
    return {
      name: category.name,
      color: category.color,
      userId: category.user_id,
    };
  }

  static async updateDtoToPrismaCategory(
    category: UpdateCategoryRequestDto,
  ): Promise<Omit<PrismaCategory, 'createdAt' | 'updatedAt'>> {
    return {
      id: category.id,
      name: category.name,
      color: category.color,
      userId: category.user_id,
    };
  }
}
