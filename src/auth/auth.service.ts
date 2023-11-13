import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDto: { email: string; password: string }) {
    const user = await this.userService.findOne(userDto.email);
    if (user && (await bcrypt.compare(userDto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(userData: any) {
    return this.generateJwt({
      sub: userData.id,
      email: userData.email,
    });
  }

  async signInOAuth(userData: any) {
    const user = await this.userService.findOne(userData.email);

    if (!user) {
      return this.signUp({ password: undefined, ...userData });
    }

    return this.generateJwt({
      sub: user.id,
      email: user.email,
    });
  }

  async signUp(userDto: UserDto) {
    if (userDto.password) {
      userDto.password = await bcrypt.hash(userDto.password, 10);
    }

    const user = await this.userService.create(userDto);

    return this.generateJwt({
      sub: user.id,
      email: user.email,
    });
  }

  async isAuthor(userId: number, courseId: number) {
    const course = await this.prismaService.course.findUnique({
      where: { id: courseId },
    });

    return userId === course.authorId;
  }

  async hasPurchased(userId: number, courseId: number) {
    return !!(await this.prismaService.purchase.findUnique({
      where: {
        courseId_userId: { userId, courseId },
      },
    }));
  }

  private generateJwt(payload: any) {
    return this.jwtService.sign(payload);
  }
}
