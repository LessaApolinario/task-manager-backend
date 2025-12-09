import 'dotenv/config';
import jwt from 'jsonwebtoken';
import type { AuthTokenPayload } from '../../domain/@types/dto/auth/AuthTokenPayload';

export function generateUserToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
}

export function getUserFromToken(token: string): AuthTokenPayload | null {
  const decodedUser = jwt.decode(token);

  if (!decodedUser) {
    return null;
  }

  if (typeof decodedUser === 'string') {
    return null;
  }

  return decodedUser as AuthTokenPayload;
}
