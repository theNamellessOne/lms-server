import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  findOne(courseId: number, userId: number) {
    return this.prisma.purchase.findUnique({
      where: {
        userId: userId,
        courseId: courseId,
        courseId_userId: { courseId, userId },
      },
    });
  }

  async purchase(courseId: number, userId: number) {
    if (!(await this.findOne(courseId, userId))) {
      return this.prisma.purchase.create({ data: { courseId, userId } });
    }
  }
}
