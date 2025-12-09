import type { INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import type { App } from 'supertest/types';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { DatabaseModule } from '../src/database/database.module';
import { CredentialsError } from '../src/errors/CredentialsError';
import { InMemoryAuthRepository } from '../src/infra/mock/auth/in_memory.auth.respository';

describe('Login integration tests', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const testingFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, AuthModule],
      providers: [AuthService, InMemoryAuthRepository],
    }).compile();

    app = testingFixture.createNestApplication();
    await app.init();
  });

  it('should not login if there is no user', async () => {
    const response = await request
      .agent(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'any_email',
        password: 'any_password',
      });

    expect(response).rejects.toThrow(CredentialsError);
    expect(response.status).toBe(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
