import { User as PrismaUser } from '../../../../generated/prisma/client';
import { hashPassword } from '../../../infra/utils/password';
import type { RegisterRequestDto } from '../../@types/dto/auth/ResgisterRequestDto';
import type { User } from '../../models/User';

export class PrismaUserMapper {
  static toUserModel(prismaUser: PrismaUser): User {
    return {
      id: prismaUser.id,
      name: prismaUser.name,
      last_name: prismaUser.lastName,
      email: prismaUser.email,
      password_hash: prismaUser.passwordHash,
    };
  }

  static async createDtoToPrismaUser(
    user: RegisterRequestDto,
  ): Promise<Omit<PrismaUser, 'id'>> {
    return {
      name: user.name,
      lastName: user.last_name,
      email: user.email,
      passwordHash: await hashPassword(user.password),
    };
  }
}
