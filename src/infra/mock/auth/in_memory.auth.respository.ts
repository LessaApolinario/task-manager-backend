import type { AuthResponseDto } from '../../../../src/@types/dto/auth/AuthResponseDto';
import type { LoginRequestDto } from '../../../../src/@types/dto/auth/LoginResquestDto';
import type { RegisterRequestDto } from '../../../../src/@types/dto/auth/ResgisterRequestDto';
import type { User } from '../../../../src/domain/models/User';
import { CredentialsError } from '../../../../src/errors/CredentialsError';
import { ResourceNotFoundError } from '../../../../src/errors/ResourceNotFoundError';
import type { AuthRepository } from '../../../../src/interfaces/respositories/AuthRepository';
import { comparePassword, hashPassword } from '../../../../src/utils/password';

export class InMemoryAuthRepository implements AuthRepository {
  private _users: User[] = [];

  async login(credentials: LoginRequestDto): Promise<AuthResponseDto> {
    const foundUser = await this.findByEmail(credentials.email);

    if (!foundUser) {
      throw new ResourceNotFoundError('User not found');
    }

    const isPasswordCorrect = await comparePassword(
      credentials.password,
      foundUser.password_hash,
    );

    if (!isPasswordCorrect) {
      throw new CredentialsError('Password incorrect');
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
}
