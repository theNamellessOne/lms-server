import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({ data: createCourseDto });
  }

  findAll() {
    return this.prisma.course.findMany();
  }

  findAllPublishedCourses() {
    return this.prisma.course.findMany({
      where: {
        isPublished: true,
      },
    });
  }

  findTeacherCourses(id: number) {
    return this.prisma.course.findMany({
      where: {
        authorId: id,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        attachments: true,
      },
    });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.prisma.course.update({ where: { id }, data: updateCourseDto });
  }

  remove(id: number) {
    return this.prisma.course.delete({ where: { id } });
  }
}
