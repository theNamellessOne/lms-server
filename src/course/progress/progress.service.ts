import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) {}

  complete(chapterId: number, userId: number) {
    return this.prisma.progress.update({
      where: {
        userId_chapterId: { userId, chapterId },
      },
      data: {
        isCompleted: true,
      },
    });
  }
}
