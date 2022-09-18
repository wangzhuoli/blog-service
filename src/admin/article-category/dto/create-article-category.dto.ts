import { IsString, IsInt } from 'class-validator';

export class CreateArticleCategoryDto {
  @IsString()
  name: string;

  @IsInt()
  sort: number;
}
