import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  @Column({ comment: '账号' })
  name: string;

  @Column({ comment: '密码' })
  password: string;

  @Column({ comment: '头像', default: '' })
  avatar: string;
}
