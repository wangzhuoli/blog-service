import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { ArticleCategoryEntity } from './article-category.entity';
import { BaseEntity } from '../common/entitys/base.entity';

@Entity('article')
@Index(['title'])
export class ArticleEntity extends BaseEntity {
  @Column({ comment: '标题' })
  title: string;

  @Column({ comment: '内容', type: 'text' })
  content: string;

  @Column({ comment: '排序' })
  sort: number;

  @Column({ comment: '缩略图' })
  thumbUrl: string;

  @Column({ comment: '简介', type: 'text' })
  intro: string;

  @JoinTable()
  @ManyToMany(
    (type) => ArticleCategoryEntity,
    (articleCategoryEntity) => articleCategoryEntity.article,
    { cascade: true },
  )
  category: ArticleCategoryEntity[];
}
