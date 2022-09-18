import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { IsString, ValidateIf } from 'class-validator';

export class FindAllArticleCategoryDto extends PaginationQueryDto {
  @ValidateIf(({ title }) => title)
  @IsString()
  name: string;
}
