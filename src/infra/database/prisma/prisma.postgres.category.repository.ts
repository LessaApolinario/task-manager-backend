import { Injectable } from '@nestjs/common';
import type { DefaultIdResponse } from '../../../domain/@types/DefaultIdResponse';
import type { CreateCategoryRequestDto } from '../../../domain/@types/dto/category/CreateCategoryRequestDto';
import type { UpdateCategoryRequestDto } from '../../../domain/@types/dto/category/UpdateCategoryRequestDto';
import { ResourceAlreadyExistsError } from '../../../domain/errors/ResourceAlreadyExistsError';
import { ResourceNotFoundError } from '../../../domain/errors/ResourceNotFoundError';
import { CategoryRepository } from '../../../domain/interfaces/respositories/CategoryRepository';
import { PrismaCategoryMapper } from '../../../domain/mappers/prisma/category.mapper';
import type { Category } from '../../../domain/models/Category';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaPostgresCategoryRepository extends CategoryRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(category: CreateCategoryRequestDto): Promise<DefaultIdResponse> {
    const foundCategory = await this.findByUserIdAndName(
      category.user_id,
      category.name,
    );

    if (foundCategory) {
      throw new ResourceAlreadyExistsError(
        'Category already exists for this user',
      );
    }

    const createdCategory = await this.prisma.category.create({
      data: PrismaCategoryMapper.createDtoToPrismaCategory(category),
    });

    return {
      id: createdCategory.id,
    };
  }

  async update(category: UpdateCategoryRequestDto): Promise<Category> {
    const foundCategory = await this.prisma.category.findUnique({
      where: { id: category.id },
    });

    if (!foundCategory) {
      throw new ResourceNotFoundError('Category not found for this user');
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id: category.id },
      data: PrismaCategoryMapper.updateDtoToPrismaCategory(category),
    });

    return PrismaCategoryMapper.toCategoryModel(updatedCategory);
  }

  async remove(id: string): Promise<Category> {
    const foundCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!foundCategory) {
      throw new ResourceNotFoundError('Category not found');
    }

    const deletedCategory = await this.prisma.category.delete({
      where: { id },
    });

    return PrismaCategoryMapper.toCategoryModel(deletedCategory);
  }

  async fetchByUserId(userId: string): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: { userId },
    });

    return categories.map((category) => {
      return PrismaCategoryMapper.toCategoryModel(category);
    });
  }

  async findByUserIdAndName(
    userId: string,
    name: string,
  ): Promise<Category | null> {
    const foundCategory = await this.prisma.category.findFirst({
      where: {
        userId,
        name,
      },
    });

    return foundCategory
      ? PrismaCategoryMapper.toCategoryModel(foundCategory)
      : null;
  }
}
