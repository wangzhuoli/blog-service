import { Module } from '@nestjs/common';
import { FrontService } from './front.service';
import { FrontController } from './front.controller';
import { ArticleCategoryModule } from './article-category/article-category.module';
import { ArticleModule } from './article/article.module';

@Module({
  providers: [FrontService],
  controllers: [FrontController],
  imports: [ArticleCategoryModule, ArticleModule],
})
export class FrontModule {}
