import type { AuthTokenPayload } from '../../src/domain/@types/dto/auth/AuthTokenPayload';
import {
  generateUserToken,
  getUserFromToken,
} from '../../src/infra/utils/token';

describe('User token unit tests', () => {
  const mockAuthTokenPayload: AuthTokenPayload = {
    id: 'fake-id',
  };

  it('should generate a user token', () => {
    const token = generateUserToken(mockAuthTokenPayload);
    expect(token).toBeTruthy();
  });

  it('should decode a user token', () => {
    const token = generateUserToken(mockAuthTokenPayload);
    const decodedUser = getUserFromToken(token);
    expect(decodedUser).toBeTruthy();
    expect(typeof decodedUser).toBe('object');
    expect(decodedUser).toHaveProperty('id', mockAuthTokenPayload.id);
  });
});
