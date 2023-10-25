import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findOne(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  create(user: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: user });
  }
}
