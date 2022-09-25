import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Headers,
  Put,
} from '@nestjs/common';

import { AuthService } from '../../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountLoginDto } from './dto/account-login.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountService } from './account.service';

@Controller('admin/account')
export class AccountController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  // 获取账号信息
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Headers() headers) {
    const { authorization } = headers;
    const result = await this.authService.verifyToken(authorization);
    const account = await this.accountService.findOneById(result.id);
    return {
      avatar: account.avatar,
      id: account.id,
      name: account.name,
    };
  }

  // 登录
  @Post('login')
  async login(@Body() accountLoginDto: AccountLoginDto) {
    const token = await this.authService.signToken(accountLoginDto);
    return {
      token: token,
      expires: parseInt(process.env.JWT_EXPIRES_IN),
    };
  }

  // 登录
  @Put('update')
  async update(@Headers() headers, @Body() updateAccountDto: UpdateAccountDto) {
    const { authorization } = headers;
    const result = await this.authService.verifyToken(authorization);
    return this.accountService.update(result.id, updateAccountDto);
  }
}
