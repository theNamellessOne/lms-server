import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChapterService {
  constructor(private prisma: PrismaService) {}

  create(createChapterDto: CreateChapterDto) {
    return this.prisma.chapter.create({ data: createChapterDto });
  }

  findAll(courseId: number) {
    return this.prisma.chapter.findMany({
      where: { courseId },
      orderBy: {
        position: Prisma.SortOrder.asc,
      },
    });
  }

  findOne(id: number, courseId: number) {
    return this.prisma.chapter.findUnique({
      where: {
        id,
        courseId,
      },
    });
  }

  update(id: number, courseId: number, updateChapterDto: UpdateChapterDto) {
    return this.prisma.chapter.update({
      where: { id, courseId },
      data: updateChapterDto,
    });
  }

  remove(id: number, courseId: number) {
    return this.prisma.chapter.delete({ where: { id, courseId } });
  }
}
