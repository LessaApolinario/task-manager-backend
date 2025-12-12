import type { INestApplication } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

function getServerPort(app: INestApplication) {
  const configService = app.get(EnvService);
  return configService.get('PORT');
}

function registerGlobalFilters(app: INestApplication) {
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
}

function createSwaggerDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Task management API')
    .setDescription('API for managing tasks and categories')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  registerGlobalFilters(app);
  createSwaggerDocs(app);
  const port = getServerPort(app);

  await app.listen(port);
}
bootstrap();
