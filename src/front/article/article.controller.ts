import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticleService } from '../../admin/article/article.service';
import { FindAllArticleDto } from '../../admin/article/dto/find-all-article.dto';

@Controller('front/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  find(@Query() query: FindAllArticleDto) {
    return this.articleService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articleService.findOne(id);
  }
}
