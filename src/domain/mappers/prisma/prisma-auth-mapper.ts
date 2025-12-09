import type { User } from 'generated/prisma/client.js';
import type { AuthTokenPayload } from '../../@types/dto/auth/AuthTokenPayload';

export class PrismaAuthMapper {
  static toTokenPayload(user: User): AuthTokenPayload {
    return {
      name: user.name,
      last_name: user.lastName,
      email: user.email,
    };
  }
}
