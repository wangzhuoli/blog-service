import { IsInt, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  sort: number;

  @IsString()
  thumbUrl: string;

  @IsInt({ each: true })
  readonly categories: number[];
}
