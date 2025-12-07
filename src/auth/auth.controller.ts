import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe.js';

import { z } from 'zod';

import type { AuthUseCase } from 'src/interfaces/usecases/AuthUseCase.js';

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

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthUseCase) {}

  @Post('/login')
  @UsePipes(new ZodValidationPipe(loginBodySchema))
  @HttpCode(200)
  async login(@Body() body: LoginBodySchema) {
    return await this.authService.login(body);
  }

  @Post('/register')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerBodySchema))
  async register(@Body() body: RegisterBodySchema) {
    await this.authService.register(body);
  }
}
