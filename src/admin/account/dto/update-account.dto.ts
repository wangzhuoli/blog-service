import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAccountDto {
  @IsNotEmpty({ message: '用户名为必填项' })
  name: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
