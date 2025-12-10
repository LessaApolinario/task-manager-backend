import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/respositories/UserRepository';
import { UserUseCase } from '../../domain/interfaces/usecases/UserUseCase';
import type { User } from '../../domain/models/User';

@Injectable()
export class UserService extends UserUseCase {
  constructor(private userRepository: UserRepository) {
    super();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
