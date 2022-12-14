import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // jwt 验证
  async validate(payload: any) {
    const dateNow = Math.floor(Date.now() / 1000);
    if (dateNow - payload.iat < parseInt(process.env.JWT_EXPIRES_IN)) {
      // token有效
      return true;
    }
    // token失效
    throw new HttpException('登录失效，请重新登录', HttpStatus.FORBIDDEN);
  }
}
