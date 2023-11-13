import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProgressModule } from '../progress/progress.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [PrismaModule, ProgressModule, AuthModule],
  controllers: [ChapterController],
  providers: [ChapterService],
})
export class ChapterModule {}
