import { Injectable } from '@nestjs/common';
import { DefaultIdResponse } from '../../domain/@types/DefaultIdResponse';
import { CreateCategoryRequestDto } from '../../domain/@types/dto/category/CreateCategoryRequestDto';
import { UpdateCategoryRequestDto } from '../../domain/@types/dto/category/UpdateCategoryRequestDto';
import { CategoryRepository } from '../../domain/interfaces/respositories/CategoryRepository';
import { CategoryUseCase } from '../../domain/interfaces/usecases/CategoryUseCase';
import { Category } from '../../domain/models/Category';

@Injectable()
export class CategoryService extends CategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {
    super();
  }

  create(category: CreateCategoryRequestDto): Promise<DefaultIdResponse> {
    return this.categoryRepository.create(category);
  }

  update(category: UpdateCategoryRequestDto): Promise<Category> {
    return this.categoryRepository.update(category);
  }

  remove(id: string): Promise<Category> {
    return this.categoryRepository.remove(id);
  }

  fetchByUserId(userId: string): Promise<Category[]> {
    return this.categoryRepository.fetchByUserId(userId);
  }

  findByUserIdAndName(userId: string, name: string): Promise<Category | null> {
    return this.categoryRepository.findByUserIdAndName(userId, name);
  }
}
