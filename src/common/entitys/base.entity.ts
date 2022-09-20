import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dayjs = require('dayjs');

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @CreateDateColumn({
    comment: '创建时间',
    transformer: {
      to(value: any): any {
        //
      },
      from(value: any): any {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  })
  createAt: Date;

  @UpdateDateColumn({
    comment: '更新时间',
    transformer: {
      to(value: any): any {
        //
      },
      from(value: any): any {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  })
  updateAt: Date;
}
