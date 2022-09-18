import { CreateArticleDto } from './create-article.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
