import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../entitys/account.entity';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  findOne(name: string): Promise<AccountEntity> {
    return this.accountRepository.findOne({ where: { name } });
  }

  async findOneById(id: number): Promise<AccountEntity> {
    const account = await this.accountRepository.findOne({ where: { id } });
    if (!account) {
      throw new HttpException('账号不存在', HttpStatus.NOT_FOUND);
    }
    return account;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.accountRepository.preload({
      id,
      ...updateAccountDto,
    });
    return this.accountRepository.save(account);
  }
}
