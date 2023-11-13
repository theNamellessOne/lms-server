import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(protected authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const userId = +req.user['id'];
    const courseId = +req.params['courseid'];

    return await this.authService.isAuthor(userId, courseId);
  }
}
