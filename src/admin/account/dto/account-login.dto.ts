import { IsNotEmpty } from 'class-validator';

export class AccountLoginDto {
  @IsNotEmpty({ message: '账号为必填项' })
  name: string;
  @IsNotEmpty({ message: '密码为必填项' })
  password: string;
}
