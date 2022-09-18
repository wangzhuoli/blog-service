import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  size: number;

  @IsOptional()
  @IsPositive()
  page: number;
}
