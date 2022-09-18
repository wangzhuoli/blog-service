import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleCategoryEntity } from './article-category.entity';

@Entity('articles')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '标题' })
  title: string;

  @Column({ comment: '内容' })
  content: string;

  @Column({ comment: '排序' })
  sort: number;

  @Column({ comment: '缩略图' })
  thumbUrl: string;

  @JoinTable()
  @ManyToMany(
    (type) => ArticleCategoryEntity,
    (articleCategoryEntity) => articleCategoryEntity.articles,
    { cascade: true },
  )
  categories: ArticleCategoryEntity[];
}
