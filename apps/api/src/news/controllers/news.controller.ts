import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { SearchNewsDto } from '@repo/api/news/search-news.dto';

@Controller('news')
export class NewsController {
  constructor(
    private newsService: NewsService
  ) {}

  @Get('/')
  async getNews(
    @Res() res,
    @Query() searchNewsDto: SearchNewsDto
  ) {
    const result = await this.newsService.fetchNews(
      searchNewsDto.page ? Number(searchNewsDto.page) : undefined,
      searchNewsDto.limit ? Number(searchNewsDto.limit) : undefined,
      searchNewsDto.search
    );

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'News fetched successfully',
      ...result
    });
  }
}
