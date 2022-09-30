import { Column, Index, ManyToMany } from 'typeorm';
import { Entity } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { BaseEntity } from '../common/entitys/base.entity';

@Entity('article_category')
@Index(['name'])
export class ArticleCategoryEntity extends BaseEntity {
  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '排序' })
  sort: number;

  @ManyToMany(
    (type) => ArticleEntity,
    (articleEntity) => articleEntity.category,
  )
  article: ArticleEntity[];
}
