import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './guard/local.guard';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/jwt.guard';
import { GoogleGuard } from './guard/google.guard';
import { Request, Response } from 'express';
import * as process from 'process';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @UseGuards(LocalGuard)
  signIn(@Req() req: Request) {
    return this.authService.signIn(req.user);
  }

  @Post('sign-up')
  signUp(@Body() userDto: UserDto) {
    return this.authService.signUp(userDto);
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  googleSignIn() {}

  @Get('google-redirect')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.signInOAuth(req.user);
    res.cookie('access_token', token);
    res.redirect(process.env.FRONTEND_URL);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  me(@Req() req: Request) {
    return req.user;
  }
}
