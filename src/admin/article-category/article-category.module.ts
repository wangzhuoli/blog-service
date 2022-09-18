import { Module } from '@nestjs/common';
import { ArticleCategoryController } from './article-category.controller';
import { ArticleCategoryService } from './article-category.service';
import { ArticleCategoryEntity } from '../../entitys/article-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCategoryEntity])],
  controllers: [ArticleCategoryController],
  providers: [ArticleCategoryService],
})
export class ArticleCategoryModule {}
