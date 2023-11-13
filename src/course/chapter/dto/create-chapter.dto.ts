export class CreateChapterDto {
  position: number = 0;

  title: string;
  videoUrl: string;
  description: string;

  isFree: boolean;
  isPublished: boolean;

  courseId: number;
}
