import 'dotenv/config';
import { sign } from 'jsonwebtoken';

import type { AuthTokenPayload } from '../../src/@types/dto/auth/AuthTokenPayload';

export function generateUserToken(payload: AuthTokenPayload) {
  return sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
}
