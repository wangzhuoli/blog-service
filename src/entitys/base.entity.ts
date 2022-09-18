import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createAt: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateAt: Date;
}
