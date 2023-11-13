import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    CourseModule,
    PurchaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
