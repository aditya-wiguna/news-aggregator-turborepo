import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GuardianClientService {
  private readonly httpService: HttpService;
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GUARDIAN_API_KEY');

    this.httpService = new HttpService(
      axios.create({
        baseURL: this.configService.get<string>('GUARDIAN_API_URL'),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );
  }

  /**
   * Search for articles in The Guardian
   * @param query Search query
   * @param page Page number (default: 1)
   * @param pageSize Number of results per page (default: 10)
   * @returns Search results
   */
  async search(page: number = 1, pageSize: number = 10) {
    const response = await firstValueFrom(
      this.httpService.get('/search', {
        params: {
          page,
          'page-size': pageSize,
          'api-key': this.apiKey,
        },
      })
    );

    return response.data;
  }

  /**
   * Get a specific content item from The Guardian
   * @param contentId The ID of the content to retrieve
   * @returns Content data
   */
  async getContent(contentId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`/${contentId}`, {
        params: {
          'api-key': this.apiKey,
        },
      })
    );

    return response.data;
  }

  /**
   * Get content by section
   * @param section The section name (e.g., 'politics', 'technology')
   * @param page Page number (default: 1)
   * @param pageSize Number of results per page (default: 10)
   * @returns Section content
   */
  async getSection(section: string, page: number = 1, pageSize: number = 10) {
    const response = await firstValueFrom(
      this.httpService.get(`/${section}`, {
        params: {
          page,
          'page-size': pageSize,
          'api-key': this.apiKey,
        },
      })
    );

    return response.data;
  }
}
