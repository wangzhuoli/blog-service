import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateArticleCategoryDto {
  @IsString()
  @IsNotEmpty({ message: '名称为必填项' })
  name: string;

  @IsInt()
  sort: number;
}
