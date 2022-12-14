import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ArticleCategoryEntity } from '../../entitys/article-category.entity';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';
import { pagination, getDefaultPagination } from '../../utils/pagination';
import { FindAllArticleCategoryDto } from './dto/find-all-article-category.dto';

@Injectable()
export class ArticleCategoryService {
  constructor(
    @InjectRepository(ArticleCategoryEntity)
    private readonly articleCategoryRepository: Repository<ArticleCategoryEntity>,
  ) {}

  async find(query?: FindAllArticleCategoryDto) {
    const { name = '' } = query;
    const { take, skip } = getDefaultPagination(query);
    const [list, count] = await this.articleCategoryRepository.findAndCount({
      where: { name: Like(`%${name}%`) },
      order: {
        sort: 'DESC',
        createAt: 'DESC',
      },
      take,
      skip,
    });
    return pagination({ take, skip, total: count, list });
  }

  findAll() {
    return this.articleCategoryRepository.find({
      order: {
        sort: 'DESC',
        createAt: 'DESC',
      },
    });
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
