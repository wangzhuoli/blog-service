import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '../../entitys/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  findAll() {
    return this.articleRepository.find();
  }

  async findOne(id: number) {
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

  create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleRepository.preload({
      id,
      ...updateArticleDto,
    });
    if (!article) {
      throw new NotFoundException(`文章id=${id}不存在`);
    }
    return this.articleRepository.save(article);
  }

  async remove(id: number) {
    const article = await this.findOne(id);
    return this.articleRepository.remove(article);
  }
}
