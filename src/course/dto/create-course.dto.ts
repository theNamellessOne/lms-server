export class CreateCourseDto {
  price: number;

  title: string;
  imageUrl: string;
  description: string;

  isPublished: boolean;

  authorId: number;
  categoryId: number;
}
