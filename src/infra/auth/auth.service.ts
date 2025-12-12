import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from '../../domain/@types/dto/auth/AuthResponseDto';
import { LoginRequestDto } from '../../domain/@types/dto/auth/LoginResquestDto';
import { RegisterRequestDto } from '../../domain/@types/dto/auth/ResgisterRequestDto';
import { NotAllowedError } from '../../domain/errors/NotAllowedError';
import { ResourceNotFoundError } from '../../domain/errors/ResourceNotFoundError';
import { AuthUseCase } from '../../domain/interfaces/usecases/AuthUseCase';
import { UserUseCase } from '../../domain/interfaces/usecases/UserUseCase';
import { User } from '../../domain/models/User';
import { comparePassword } from '../utils/password';

@Injectable()
export class AuthService extends AuthUseCase {
  constructor(
    private userUseCase: UserUseCase,
    private jwtService: JwtService,
  ) {
    super();
  }

  async login(credentials: LoginRequestDto): Promise<AuthResponseDto> {
    const user = await this.userUseCase.findByEmail(credentials.email);

    if (!user) {
      throw new ResourceNotFoundError('User not found');
    }

    const isPasswordCorrect = await comparePassword(
      credentials.password,
      user.password_hash,
    );

    if (!isPasswordCorrect) {
      throw new NotAllowedError();
    }

    const payload = {
      sub: user?.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterRequestDto): Promise<User> {
    return this.userUseCase.register(user);
  }

  async validateUser({
    email,
    password,
  }: LoginRequestDto): Promise<User | null> {
    const user = await this.userUseCase.findByEmail(email);
    const isPasswordCorrect = await comparePassword(
      password,
      user?.password_hash ?? '',
    );

    return isPasswordCorrect ? user : null;
  }
}
