import { IsString, IsInt } from 'class-validator';

export class CreateArticleCategoryDto {
  @IsString()
  name: string;

  @IsString()
  path: string;

  @IsInt()
  sort: number;
}
