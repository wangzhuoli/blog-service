import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '../../entitys/article.entity';
import { Repository } from 'typeorm';
import { ArticleCategoryService } from '../article-category/article-category.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}

  findAll() {
    return this.articleRepository.find({
      relations: ['categories'],
    });
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      relations: ['categories'],
      where: {
        id,
      },
    });
    if (!article) {
      throw new NotFoundException(`文章id=${id}不存在`);
    }
    return article;
  }

  async create(createArticleDto: CreateArticleDto) {
    const categories = await Promise.all(
      createArticleDto.categories.map((id) =>
        this.preloadArticleCategoryById(id),
      ),
    );
    const article = this.articleRepository.create({
      ...createArticleDto,
      categories,
    });
    return this.articleRepository.save(article);
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const categories =
      updateArticleDto.categories &&
      (await Promise.all(
        updateArticleDto.categories.map((id) =>
          this.preloadArticleCategoryById(id),
        ),
      ));
    const article = await this.articleRepository.preload({
      id,
      ...updateArticleDto,
      categories,
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

  async preloadArticleCategoryById(id: number) {
    const category = await this.articleCategoryService.findOne(id);
    if (category) {
      return category;
    }
  }
}
