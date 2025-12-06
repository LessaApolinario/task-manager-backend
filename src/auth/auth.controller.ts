import { Controller } from '@nestjs/common';
import type { AuthService } from './auth.service.js';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
}
