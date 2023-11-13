import { Injectable } from '@nestjs/common';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AttachmentService {
  constructor(private prisma: PrismaService) {}

  create(createAttachmentDto: CreateAttachmentDto) {
    return this.prisma.attachment.create({ data: createAttachmentDto });
  }

  findAll(courseId: number) {
    return this.prisma.attachment.findMany({ where: { courseId } });
  }

  findOne(id: number, courseId: number) {
    return this.prisma.attachment.findUnique({
      where: {
        id,
        courseId,
      },
    });
  }

  update(
    id: number,
    courseId: number,
    updateAttachmentDto: UpdateAttachmentDto,
  ) {
    return this.prisma.attachment.update({
      where: { id, courseId },
      data: updateAttachmentDto,
    });
  }

  remove(id: number, courseId: number) {
    return this.prisma.attachment.delete({ where: { id, courseId } });
  }
}
