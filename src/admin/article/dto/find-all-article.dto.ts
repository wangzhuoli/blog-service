import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { IsString, ValidateIf } from 'class-validator';

export class FindAllArticleDto extends PaginationQueryDto {
  @ValidateIf(({ title }) => title)
  @IsString()
  title: string;
}
