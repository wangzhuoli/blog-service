import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleService } from './article.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/article')
@UseGuards(AuthGuard('jwt'))
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.articleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articleService.findOne(id);
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleService.remove(id);
  }
}
