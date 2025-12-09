import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string, rounds: number = 10) {
  return await hash(password, rounds);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  return await compare(password, hashedPassword);
}
