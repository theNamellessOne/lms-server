import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDto: UserDto) {
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

  async signInOAuth(userData) {
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

  private generateJwt(payload: any) {
    return { access_token: this.jwtService.sign(payload) };
  }
}
