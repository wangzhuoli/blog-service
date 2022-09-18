import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountsModule } from '../admin/accounts/accounts.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    AccountsModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
