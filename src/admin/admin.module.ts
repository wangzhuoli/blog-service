import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ArticleModule } from './article/article.module';

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [ArticleModule],
})
export class AdminModule {}
