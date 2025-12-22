import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { z } from 'zod';
import { AuthUseCase } from '../../domain/interfaces/usecases/AuthUseCase';
import { GetProfileByIdApiResponse } from '../decorators/http/swagger/auth/get-profile-by-id.response.decorator';
import { LoginApiRequest } from '../decorators/http/swagger/auth/login.request.decorator';
import { LoginApiResponse } from '../decorators/http/swagger/auth/login.response.decorator';
import { RegisterUserApiRequest } from '../decorators/http/swagger/auth/register.request.decorator';
import { RegisterUserApiResponse } from '../decorators/http/swagger/auth/register.response.decorator';
import { SwaggerAuth } from '../decorators/http/swagger/auth/swagger-auth.decorator';
import { ZodValidationPipe } from '../pipes/ZodValidationPipe';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public';

const loginBodySchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginBodySchema = z.infer<typeof loginBodySchema>;

const registerBodySchema = z.object({
  name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
});

type RegisterBodySchema = z.infer<typeof registerBodySchema>;

@Public()
@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  @Post('/login')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(loginBodySchema))
  @LoginApiRequest()
  @LoginApiResponse()
  async login(@Body() body: LoginBodySchema) {
    return await this.authUseCase.login(body);
  }

  @Post('/register')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerBodySchema))
  @RegisterUserApiRequest()
  @RegisterUserApiResponse()
  async register(@Body() body: RegisterBodySchema) {
    const registeredUser = await this.authUseCase.register(body);
    return {
      id: registeredUser.id,
    };
  }

  @Get('/profile/:id')
  @HttpCode(200)
  @SwaggerAuth()
  @UseGuards(JwtAuthGuard)
  @GetProfileByIdApiResponse()
  async getProfileById(@Param('id') id: string) {
    return await this.authUseCase.findProfileById(id);
  }
}
