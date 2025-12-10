import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import type { App } from 'supertest/types';
import { AuthModule } from '../../src/infra/auth/auth.module';
import { AuthService } from '../../src/infra/auth/auth.service';
import { DatabaseModule } from '../../src/infra/database/database.module';
import { InMemoryAuthRepository } from '../../src/infra/mock/auth/in_memory.auth.respository';

describe('Login integration tests', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const testingFixture = await Test.createTestingModule({
      imports: [DatabaseModule, AuthModule],
      providers: [AuthService, InMemoryAuthRepository],
    }).compile();

    app = testingFixture.createNestApplication();
    await app.init();
  });

  it('should not login if there is no user', async () => {
    await request.agent(app.getHttpServer()).post('/auth/register').send({
      name: 'any_name',
      last_name: 'any_last_name',
      email: 'any_email',
      password: 'any_password',
    });

    const response = await request
      .agent(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'any_email',
        password: 'any_password',
      });

    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
