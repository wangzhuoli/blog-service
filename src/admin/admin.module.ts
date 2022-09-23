import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ArticleModule } from './article/article.module';
import { ArticleCategoryModule } from './article-category/article-category.module';
import { AccountModule } from './account/account.module';
import { OssModule } from './oss/oss.module';

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [ArticleModule, ArticleCategoryModule, AccountModule, OssModule],
})
export class AdminModule {}
