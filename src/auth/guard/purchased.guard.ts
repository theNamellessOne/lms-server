import { ExecutionContext } from '@nestjs/common';
import { AuthorGuard } from './author.guard';

export class PurchasedGuard extends AuthorGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (await super.canActivate(context)) return true;

    const req = context.switchToHttp().getRequest();
    const userId = +req.user['id'];
    const courseId = +req.params['courseid'];

    return this.authService.hasPurchased(userId, courseId);
  }
}
