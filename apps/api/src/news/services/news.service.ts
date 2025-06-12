import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { News, NewsDocument } from "src/news/schemas/news.schema";
import { NewsClientService } from "./news-client.service";
import { CacheService } from "src/cache/services/cache.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class NewsService{
  constructor(
    @InjectModel(News.name)
    private newsModel: Model<NewsDocument>,

    private newsClientService: NewsClientService,
    private cacheService: CacheService,
    private eventEmitter: EventEmitter2,
  ){}

  /**
   * Generates a slug from a URL by removing the domain part
   * @param url The full URL
   * @returns The path portion of the URL as a slug
   */
  generateSlugFromUrl(url: string): string {
    try {
      // Create a URL object to parse the URL
      const urlObj = new URL(url);
      // Return the pathname without the leading slash
      return urlObj.pathname.substring(1);
    } catch (error) {
      // If URL parsing fails, return the original URL or a fallback
      console.error('Error generating slug from URL:', error);
      return url;
    }
  }

  /**
   * Syncronize news data from client to database
   *
   * @description This method syncronize news data from client to database.
   * @returns void
   */
  async syncronizeDataToDatabase() {
    const response = await this.newsClientService.getTopHeadlines();

    const newsData = response.articles.map((item) => ({
      slug:          this.generateSlugFromUrl(item.url),
      title:         item.title,
      content:       item.content,
      short_content: item.description,
      image_url:     item.urlToImage,
      source:        item.source.name,
      published_at:  new Date(item.publishedAt),
      source_url:    item.url,
    }));

    // Handle duplicate data by protecting with index in mongoDB
    await this.newsModel.insertMany(newsData);

    // Invalidate all news cache after synchronization
    this.eventEmitter.emit('destroy.cache', 'news:*');
  }

  /**
   * Fetch news with pagination and search functionality with caching
   *
   * @param page Page number (default: 1)
   * @param limit Number of items per page (default: 10)
   * @param search Optional search keyword to filter news by title or content
   * @returns Object containing paginated news items and metadata
   */
  async fetchNews(page: number = 1, limit: number = 10, search?: string) {
    const pageNum = Math.max(1, page);
    const limitNum = Math.max(1, Math.min(100, limit));
    const skip = (pageNum - 1) * limitNum;

    const cacheKey = `news:${pageNum}:${limitNum}:${search || 'all'}`;

    const cachedData = await this.cacheService.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    let query = {};

    if (search && search.trim()) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { short_content: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const data = await this.newsModel.find(query)
      .sort({ published_at: -1 })
      .skip(skip)
      .limit(limitNum)
      .exec();

    const total = await this.newsModel.countDocuments(query).exec();

    const result = {
      data,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        total_pages: Math.ceil(total / limitNum)
      }
    };

    // Cache the result for 1 hour
    await this.cacheService.set(cacheKey, JSON.stringify(result), 3600);

    return result;
  }
}
