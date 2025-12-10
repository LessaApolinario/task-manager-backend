import type { User } from '../../../../src/domain/models/User';
import type { AuthResponseDto } from '../../../domain/@types/dto/auth/AuthResponseDto';
import type { LoginRequestDto } from '../../../domain/@types/dto/auth/LoginResquestDto';
import type { RegisterRequestDto } from '../../../domain/@types/dto/auth/ResgisterRequestDto';
import { NotAllowedError } from '../../../domain/errors/NotAllowedError';
import { ResourceNotFoundError } from '../../../domain/errors/ResourceNotFoundError';
import { AuthRepository } from '../../../domain/interfaces/respositories/AuthRepository';
import { comparePassword, hashPassword } from '../../utils/password';

export class InMemoryAuthRepository implements AuthRepository {
  private _users: User[] = [];

  async login(credentials: LoginRequestDto): Promise<AuthResponseDto> {
    const foundUser = await this.findByEmail(credentials.email);

    if (!foundUser) {
      throw new ResourceNotFoundError();
    }

    const isPasswordCorrect = await comparePassword(
      credentials.password,
      foundUser.password_hash,
    );

    if (!isPasswordCorrect) {
      throw new NotAllowedError();
    }

    return { token: 'string-token' };
  }

  async register(user: RegisterRequestDto): Promise<void> {
    const newId = String(this._users.length + 1);

    this._users.push({
      id: newId,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      password_hash: await hashPassword(user.password),
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return (
      this._users.find((user) => {
        return user.email === email;
      }) ?? null
    );
  }

  get users() {
    return this._users;
  }
}
