import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { NotAllowedError } from '../domain/errors/NotAllowedError';
import { ResourceNotFoundError } from '../domain/errors/ResourceNotFoundError';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof ResourceNotFoundError) {
      const context = host.switchToHttp();
      const response = context.getResponse();

      return response.status(404).json({
        statusCode: 404,
        error: exception.name,
        message: exception.message,
      });
    }

    if (exception instanceof NotAllowedError) {
      const context = host.switchToHttp();
      const response = context.getResponse();

      return response.status(401).json({
        statusCode: 401,
        error: exception.name,
        message: exception.message,
      });
    }

    if (exception instanceof HttpException) {
      return super.catch(exception, host);
    }

    super.catch(exception, host);
  }
}
