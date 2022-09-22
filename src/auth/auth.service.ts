import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AccountService } from '../admin/account/account.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  // 账号验证
  async validateAccount(name: string, pass: string): Promise<any> {
    const account = await this.accountService.findOne(name);
    if (account && account.password === pass) {
      const { password, ...result } = account;
      return result;
    }
    if (!account) {
      throw new HttpException('账号不存在', HttpStatus.NOT_FOUND);
    }
    if (account.password !== pass) {
      throw new HttpException('账号或密码错误', HttpStatus.NOT_FOUND);
    }
  }

  // token签名
  async signToken(params: { name: string; password: string }) {
    const { name, password } = params;
    const account = await this.validateAccount(name, password);
    if (account) {
      const token = this.jwtService.sign(account, {
        secret: process.env.JWT_SECRET,
      });
      return token;
    }
    return null;
  }

  // 解析token信息
  async verifyToken(token: string) {
    token = token.replace('Bearer ', '');
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
