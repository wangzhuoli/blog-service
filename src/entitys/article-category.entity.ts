import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity('article_categories')
export class ArticleCategoryEntity {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '排序' })
  sort: number;

  @ManyToMany(
    (type) => ArticleEntity,
    (articleEntity) => articleEntity.categories,
  )
  articles: ArticleEntity[];
}
