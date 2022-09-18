import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '../../entitys/article.entity';

@Controller('admin/article')
export class ArticleController {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  @Get()
  findAll() {
    return this.articleRepository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const article = await this.articleRepository.findOne({
      where: {
        id,
      },
    });
    if (!article) {
      throw new NotFoundException(`文章id=${id}不存在`);
    }
    return article;
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const article = await this.articleRepository.preload({
      id,
      ...updateArticleDto,
    });
    if (!article) {
      throw new NotFoundException(`文章id=${id}不存在`);
    }
    return this.articleRepository.save(article);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const article = await this.findOne(id);
    return this.articleRepository.remove(article);
  }
}
