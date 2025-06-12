import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from 'axios';
import { firstValueFrom } from "rxjs";

@Injectable()
export class NewsClientService{
  private readonly httpService: HttpService;
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('NEWS_API_KEY');

    this.httpService = new HttpService(
      axios.create({
        baseURL: this.configService.get<string>('NEWS_API_URL'),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );
  }

  /**
   * Search for news articles
   * @param query Search query
   * @param from Optional date to search from (YYYY-MM-DD)
   * @param sortBy Optional sort method (relevancy, popularity, publishedAt)
   * @param page Optional page number
   * @param pageSize Optional page size
   * @returns Search results
   */
  async searchEverything(query: string, options?: {
    from?: string;
    to?: string;
    sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
    page?: number;
    pageSize?: number;
    language?: string;
  }) {
    const response = await firstValueFrom(
      this.httpService.get('/v2/everything', {
        params: {
          q: query,
          from: options?.from,
          to: options?.to,
          sortBy: options?.sortBy || 'popularity',
          page: options?.page || 1,
          pageSize: options?.pageSize || 10,
          language: options?.language,
          apiKey: this.apiKey,
        },
      })
    );

    return response.data;
  }

  /**
   * Get top headlines
   * @param country Country code (e.g., 'us', 'gb')
   * @param category Optional category (business, entertainment, general, health, science, sports, technology)
   * @param page Optional page number
   * @param pageSize Optional page size
   * @returns Top headlines
   */
  async getTopHeadlines(options?: {
    country?: string;
    category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
    query?: string;
    page?: number;
    pageSize?: number;
  }) {
    const response = await firstValueFrom(
      this.httpService.get('/v2/top-headlines', {
        params: {
          country: options?.country || 'us',
          category: options?.category,
          q: options?.query,
          page: options?.page || 1,
          pageSize: options?.pageSize || 10,
          apiKey: this.apiKey,
        },
      })
    );

    return response.data;
  }

}
