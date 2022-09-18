import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '../../entitys/article.entity';
import { ArticleCategoryEntity } from '../../entitys/article-category.entity';
import { ArticleCategoryService } from '../article-category/article-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, ArticleCategoryEntity])],
  providers: [ArticleService, ArticleCategoryService],
  controllers: [ArticleController],
})
export class ArticleModule {}
