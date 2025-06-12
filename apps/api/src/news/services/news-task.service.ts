import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NewsService } from './news.service';

@Injectable()
export class NewsTaskService {
  private readonly logger = new Logger(NewsTaskService.name);

  constructor(
    private newsService: NewsService
  ){}

  @Cron(CronExpression.EVERY_HOUR)
  async handleSyncronizeDataFromGuardianNews() {
    this.newsService.syncronizeDataToDatabase();

    this.logger.log('News API syncronized');
  }
}
