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
import { ArticleCategoryService } from './article-category.service';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { FindAllArticleCategoryDto } from './dto/find-all-article-category.dto';

@Controller('admin/article-category')
@UseGuards(AuthGuard('jwt'))
export class ArticleCategoryController {
  constructor(
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}

  @Get()
  find(@Query() query: FindAllArticleCategoryDto) {
    return this.articleCategoryService.find(query);
  }

  @Get('all')
  findAll() {
    return this.articleCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articleCategoryService.findOne(id);
  }

  @Post()
  create(@Body() createArticleCategoryDto: CreateArticleCategoryDto) {
    return this.articleCategoryService.create(createArticleCategoryDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateArticleCategoryDto: UpdateArticleCategoryDto,
  ) {
    return this.articleCategoryService.update(id, updateArticleCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleCategoryService.remove(id);
  }
}
