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
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { TeacherGuard } from '../../auth/guard/teacher.guard';
import { ProgressService } from '../progress/progress.service';
import { PurchasedGuard } from '../../auth/guard/purchased.guard';
import { AuthorGuard } from '../../auth/guard/author.guard';

@Controller('course/:courseid/chapters')
export class ChapterController {
  constructor(
    private readonly progressService: ProgressService,
    private readonly chapterService: ChapterService,
  ) {}

  @Post()
  @UseGuards(JwtGuard, TeacherGuard)
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto);
  }

  @Get()
  findAll(@Param('courseid') courseId: string) {
    return this.chapterService.findAll(+courseId);
  }

  @Get(':id')
  @UseGuards(JwtGuard, PurchasedGuard)
  async findOne(@Param('id') id: string, @Param('courseid') courseId: string) {
    return this.chapterService.findOne(+id, +courseId);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, TeacherGuard, AuthorGuard)
  async update(
    @Param('id') id: string,
    @Param('courseid') courseId: string,
    @Body() updateChapterDto: UpdateChapterDto,
  ) {
    return this.chapterService.update(+id, +courseId, updateChapterDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, TeacherGuard, AuthorGuard)
  async remove(@Param('id') id: string, @Param('courseid') courseId: string) {
    return this.chapterService.remove(+id, +courseId);
  }

  @Post(':id/complete')
  @UseGuards(JwtGuard, PurchasedGuard)
  complete(@Param('id') chapterId: string, @Req() req: Express.Request) {
    return this.progressService.complete(+chapterId, +req.user['id']);
  }
}
