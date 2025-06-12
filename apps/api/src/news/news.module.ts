import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NewsController } from './controllers/news.controller';
import { NewsClientService } from './services/news-client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './schemas/news.schema';
import { NewsService } from './services/news.service';
import { NewsTaskService } from './services/news-task.service';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [
    HttpModule,
    CacheModule,
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
  ],
  controllers: [NewsController],
  providers: [
    NewsClientService,
    NewsService,
    NewsTaskService
  ],
})
export class NewsModule {}
