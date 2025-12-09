import type { AuthTokenPayload } from '../src/@types/dto/auth/AuthTokenPayload';
import { generateUserToken, getUserFromToken } from '../src/utils/token';

describe('User token unit tests', () => {
  const mockAuthTokenPayload: AuthTokenPayload = {
    name: 'fake name',
    last_name: 'fake last name',
    email: 'email@fake.com',
  };

  it('should generate a user token', async () => {
    const token = generateUserToken(mockAuthTokenPayload);
    expect(token).toBeTruthy();
  });

  it('should decode a user token', async () => {
    const token = generateUserToken(mockAuthTokenPayload);
    const decodedUser = getUserFromToken(token);
    expect(decodedUser).toBeTruthy();
    expect(typeof decodedUser).toBe('object');
    expect(decodedUser).toHaveProperty('name', mockAuthTokenPayload.name);
    expect(decodedUser).toHaveProperty(
      'last_name',
      mockAuthTokenPayload.last_name,
    );
    expect(decodedUser).toHaveProperty('email', mockAuthTokenPayload.email);
  });
});
