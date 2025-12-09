import { comparePassword, hashPassword } from '../src/utils/password';

describe('Password hashing tests', () => {
  let mockPasswordHash: string =
    '$2y$10$NrwQ9FQhdmKEXvgdbHmY2uvPtUS0kO7Vs6kGiwJkcQfguLeOBQ6uK';
  let mockPassword: string = '@root123';

  it('should hash the password', async () => {
    const hashedPassword = await hashPassword(mockPassword);
    expect(hashedPassword).toBeTruthy();
  });

  it('should compare the password', async () => {
    const isPasswordCorrect = await comparePassword(
      mockPassword,
      mockPasswordHash,
    );
    expect(isPasswordCorrect).toBeTruthy();
  });
});
