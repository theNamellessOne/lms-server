import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { TeacherGuard } from '../auth/guard/teacher.guard';
import { PurchaseService } from '../purchase/purchase.service';
import { AuthorGuard } from '../auth/guard/author.guard';

@Controller('course')
export class CourseController {
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly courseService: CourseService,
  ) {}

  @Post()
  @UseGuards(JwtGuard, TeacherGuard)
  create(
    @Body() createCourseDto: CreateCourseDto,
    @Req() req: Express.Request,
  ) {
    createCourseDto.authorId = req.user['id'];
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get('published')
  findAllPublishedCourses() {
    return this.courseService.findAllPublishedCourses();
  }

  @Get('teacher-courses')
  @UseGuards(JwtGuard, TeacherGuard)
  findMyTeacherCourses(@Req() req: Express.Request) {
    return this.courseService.findTeacherCourses(req.user['id']);
  }

  @Get(':courseid')
  findOne(@Param('courseid') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':courseid')
  @UseGuards(JwtGuard, TeacherGuard, AuthorGuard)
  async update(
    @Param('courseid') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':courseid')
  @UseGuards(JwtGuard, TeacherGuard, AuthorGuard)
  async remove(@Param('courseid') id: string) {
    return this.courseService.remove(+id);
  }

  @Post(':courseid')
  @UseGuards(JwtGuard)
  purchase(@Param('id') courseId: string, @Req() req: Express.Request) {
    return this.purchaseService.purchase(+courseId, +req.user['id']);
  }
}
