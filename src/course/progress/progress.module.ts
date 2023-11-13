import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [ProgressService],
  providers: [ProgressService],
})
export class ProgressModule {}
