import { User as PrismaUser } from '../../../../generated/prisma/client';
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
}
