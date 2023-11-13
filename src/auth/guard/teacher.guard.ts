import { CanActivate, ExecutionContext } from '@nestjs/common';

export class TeacherGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    return context.switchToHttp().getRequest().user.isTeacher;
  }
}
