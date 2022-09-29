import { Controller, Get, Query } from '@nestjs/common';
import { ArticleService } from '../../admin/article/article.service';
import { ArticleCategoryService } from '../../admin/article-category/article-category.service';

@Controller('front/index')
export class IndexController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}
  @Get()
  async getStats(@Query() query) {
    const category = await this.articleCategoryService.find(query);
    const article = await this.articleService.find(query);
    const categoryCount = category.total;
    const articleCount = article.total;
    return {
      categoryCount,
      articleCount,
    };
  }
}
