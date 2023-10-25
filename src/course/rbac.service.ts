import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service';

@Injectable()
export class RbacService {
  constructor(
    @Inject(forwardRef(() => CourseService))
    private courseService: CourseService,
  ) {}

  async isAuthor(req: Express.Request, courseId: number) {
    const userId = req.user['id'];
    const course = await this.courseService.findOne(courseId);

    return userId === course.authorId;
  }
}
