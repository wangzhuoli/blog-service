import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty({ message: '标题为必填项' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '内容为必填项' })
  content: string;

  @IsInt()
  sort: number;

  @IsString()
  @IsNotEmpty({ message: '缩略图为必填项' })
  thumbUrl: string;

  @IsString()
  @IsNotEmpty({ message: '简介为必填项' })
  intro: string;

  @IsInt({ each: true })
  readonly category: number[];
}
