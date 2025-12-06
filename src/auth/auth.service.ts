import { Injectable } from '@nestjs/common';
import type { PrismaService } from 'src/database/prisma/prisma.service.js';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
}
