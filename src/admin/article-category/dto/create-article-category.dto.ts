import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateArticleCategoryDto {
  @IsString()
  @IsNotEmpty({ message: '名称为必填项' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '路径为必填项' })
  path: string;

  @IsInt()
  sort: number;
}
