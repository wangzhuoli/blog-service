import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../../entitys/account.entity';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AccountController],
  providers: [AccountService, AuthService, JwtService],
  exports: [AccountService],
})
export class AccountModule {}
