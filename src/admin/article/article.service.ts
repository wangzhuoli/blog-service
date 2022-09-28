import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '../../entitys/article.entity';
import { Brackets, Repository } from 'typeorm';
import { ArticleCategoryService } from '../article-category/article-category.service';
import { pagination, getDefaultPagination } from '../../utils/pagination';
import { FindAllArticleDto } from './dto/find-all-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}

  async find(query: FindAllArticleDto) {
    const { take, skip } = getDefaultPagination(query);
    const { categoryId, title = '' } = query;
    const [list, count] = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .where(
        new Brackets((qb) => {
          if (categoryId) {
            qb.where('category.id = :categoryId', { categoryId });
          }
        }),
      )
      .andWhere(`article.title LIKE :title`, { title: `%${title}%` })
      .take(take)
      .skip(skip)
      .select([
        'article.id',
        'article.title',
        'article.intro',
        'article.createAt',
        'article.updateAt',
        'article.thumbUrl',
        'article.sort',
        'category.id',
        'category.sort',
        'category.name',
      ])
      .orderBy('article.sort', 'DESC')
      .addOrderBy('article.createAt', 'DESC')
      .getManyAndCount();

    return pagination({ take, skip, total: count, list });
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      relations: ['category'],
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
    const category = await Promise.all(
      createArticleDto.category.map((id) =>
        this.preloadArticleCategoryById(id),
      ),
    );
    const article = this.articleRepository.create({
      ...createArticleDto,
      category,
    });
    return this.articleRepository.save(article);
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const category =
      updateArticleDto.category &&
      (await Promise.all(
        updateArticleDto.category.map((id) =>
          this.preloadArticleCategoryById(id),
        ),
      ));
    const article = await this.articleRepository.preload({
      id,
      ...updateArticleDto,
      category,
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
