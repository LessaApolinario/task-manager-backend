import { AuthResponseDto } from '../../@types/dto/auth/AuthResponseDto';
import { LoginRequestDto } from '../../@types/dto/auth/LoginResquestDto';
import { RegisterRequestDto } from '../../@types/dto/auth/ResgisterRequestDto';
import { UserProfileDto } from '../../@types/dto/auth/UserProfileDto';
import { User } from '../../models/User';

export abstract class AuthUseCase {
  abstract login(credentials: LoginRequestDto): Promise<AuthResponseDto>;
  abstract register(user: RegisterRequestDto): Promise<User>;
  abstract validateUser(credentials: LoginRequestDto): Promise<User | null>;
  abstract findProfileById(id: string): Promise<UserProfileDto>;
}
