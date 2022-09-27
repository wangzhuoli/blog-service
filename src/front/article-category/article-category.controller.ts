import { Controller, Get } from '@nestjs/common';
import { ArticleCategoryService } from '../../admin/article-category/article-category.service';

@Controller('front/article-category')
export class ArticleCategoryController {
  constructor(
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}

  @Get('all')
  findAll() {
    return this.articleCategoryService.findAll();
  }
}
