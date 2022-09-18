import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
