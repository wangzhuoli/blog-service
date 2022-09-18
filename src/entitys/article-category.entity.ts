import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('article_categories')
export class ArticleCategoryEntity {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '排序' })
  sort: number;
}
