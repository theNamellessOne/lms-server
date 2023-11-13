import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [PurchaseService],
  providers: [PurchaseService],
})
export class PurchaseModule {}
