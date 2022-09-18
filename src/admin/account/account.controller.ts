import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Headers,
  HttpCode,
} from '@nestjs/common';

import { AuthService } from '../../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { jwtConstants } from '../../auth/constants';
import { AccountLoginDto } from './dto/account-login.dto';

@Controller('admin/account')
export class AccountController {
  constructor(private readonly authService: AuthService) {}

  // 获取账号信息
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Headers() headers) {
    const { authorization } = headers;
    return this.authService.verifyToken(authorization);
  }

  // 登录
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: AccountLoginDto) {
    const token = await this.authService.signToken(body);
    return {
      token: token,
      expires: jwtConstants.expiresIn,
    };
  }
}
