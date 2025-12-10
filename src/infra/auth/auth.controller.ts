import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { AuthUseCase } from '../../domain/interfaces/usecases/AuthUseCase';
import { ZodValidationPipe } from '../pipes/ZodValidationPipe';
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
@Controller('/auth')
export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  @Post('/login')
  @UsePipes(new ZodValidationPipe(loginBodySchema))
  @HttpCode(200)
  async login(@Body() body: LoginBodySchema) {
    return await this.authUseCase.login(body);
  }

  @Post('/register')
  @UsePipes(new ZodValidationPipe(registerBodySchema))
  @HttpCode(201)
  async register(@Body() body: RegisterBodySchema) {
    const registeredUser = await this.authUseCase.register(body);
    return {
      id: registeredUser.id,
    };
  }
}
