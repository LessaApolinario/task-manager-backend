import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthRepository } from '../../src/domain/interfaces/respositories/AuthRepository';
import { AuthModule } from '../../src/infra/auth/auth.module';
import { PrismaService } from '../../src/infra/database/prisma/prisma.service';
import { InMemoryAuthRepository } from '../../src/infra/mock/auth/in_memory.auth.respository';

const prismaMock = {
  user: {
    findUnique: jest.fn(),
  },
};

describe('Login integration tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .overrideProvider(AuthRepository)
      .useClass(InMemoryAuthRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should login', async () => {
    await request.agent(app.getHttpServer()).post('/auth/register').send({
      name: 'any_name',
      last_name: 'any_last_name',
      email: 'any_email',
      password: 'any_password',
    });

    prismaMock.user.findUnique.mockResolvedValue(null);

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
