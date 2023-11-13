import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { TeacherGuard } from '../../auth/guard/teacher.guard';
import { AuthorGuard } from '../../auth/guard/author.guard';
import { PurchasedGuard } from '../../auth/guard/purchased.guard';

@Controller('course/:courseid/attachments')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Post()
  @UseGuards(JwtGuard, TeacherGuard)
  async create(
    @Param('courseid') courseId: string,
    @Body() createAttachmentDto: CreateAttachmentDto,
  ) {
    return this.attachmentService.create(createAttachmentDto);
  }

  @Get()
  @UseGuards(JwtGuard, PurchasedGuard)
  findAll(@Param('courseid') courseId: string) {
    return this.attachmentService.findAll(+courseId);
  }

  @Get(':id')
  @UseGuards(JwtGuard, PurchasedGuard)
  findOne(@Param('id') id: string, @Param('courseid') courseId: string) {
    return this.attachmentService.findOne(+id, +courseId);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, TeacherGuard, AuthorGuard)
  async update(
    @Param('id') id: string,
    @Param('courseid') courseId: string,
    @Body() updateAttachmentDto: UpdateAttachmentDto,
  ) {
    return this.attachmentService.update(+id, +courseId, updateAttachmentDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, TeacherGuard, AuthorGuard)
  async remove(@Param('id') id: string, @Param('courseid') courseId: string) {
    return this.attachmentService.remove(+id, +courseId);
  }
}
