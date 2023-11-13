import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PurchaseModule } from '../purchase/purchase.module';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ChapterModule } from './chapter/chapter.module';
import { AttachmentModule } from './attachment/attachment.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ChapterModule,
    PurchaseModule,
    CategoryModule,
    ProgressModule,
    AttachmentModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
