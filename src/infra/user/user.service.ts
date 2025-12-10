import { Injectable } from '@nestjs/common';
import type { RegisterRequestDto } from '../../domain/@types/dto/auth/ResgisterRequestDto';
import { UserRepository } from '../../domain/interfaces/respositories/UserRepository';
import { UserUseCase } from '../../domain/interfaces/usecases/UserUseCase';
import type { User } from '../../domain/models/User';

@Injectable()
export class UserService extends UserUseCase {
  constructor(private userRepository: UserRepository) {
    super();
  }

  register(user: RegisterRequestDto): Promise<User> {
    return this.userRepository.register(user);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
