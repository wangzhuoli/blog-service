import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { IsInt, IsPositive, IsString, IsOptional } from 'class-validator';

export class FindAllArticleDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsPositive()
  @IsInt()
  categoryId: number;
}
