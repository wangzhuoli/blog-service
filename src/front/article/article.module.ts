import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleEntity } from '../../entitys/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from '../../admin/article/article.service';
import { ArticleCategoryService } from '../../admin/article-category/article-category.service';
import { ArticleCategoryEntity } from '../../entitys/article-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, ArticleCategoryEntity])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleCategoryService],
})
export class ArticleModule {}
