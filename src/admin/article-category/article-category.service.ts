import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleCategoryEntity } from '../../entitys/article-category.entity';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';

@Injectable()
export class ArticleCategoryService {
  constructor(
    @InjectRepository(ArticleCategoryEntity)
    private readonly articleCategoryRepository: Repository<ArticleCategoryEntity>,
  ) {}

  findAll() {
    return this.articleCategoryRepository.find();
  }

  async findOne(id: number) {
    const articleCategory = await this.articleCategoryRepository.findOne({
      where: {
        id,
      },
    });
    if (!articleCategory) {
      throw new NotFoundException(`分类id=${id}不存在`);
    }
    return articleCategory;
  }

  async create(createArticleCategory: CreateArticleCategoryDto) {
    const articleCategory = await this.articleCategoryRepository.create(
      createArticleCategory,
    );
    return this.articleCategoryRepository.save(articleCategory);
  }

  async update(id: number, updateArticleCategory: UpdateArticleCategoryDto) {
    const articleCategory = await this.articleCategoryRepository.preload({
      id,
      ...updateArticleCategory,
    });
    if (!articleCategory) {
      throw new NotFoundException(`分类id=${id}不存在`);
    }
    return this.articleCategoryRepository.save(articleCategory);
  }

  async remove(id: number) {
    const articleCategory = await this.findOne(id);
    return this.articleCategoryRepository.remove(articleCategory);
  }
}
