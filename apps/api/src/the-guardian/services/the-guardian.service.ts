import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { News, NewsDocument } from "src/news/schemas/news.schema";
import { GuardianClientService } from "./guardian-client.service";

@Injectable()
export class TheGuardianService{
  constructor(
    @InjectModel(News.name)
    private newsModel: Model<NewsDocument>,

    private guardianClientService: GuardianClientService,
  ){}

  async fetchAndSaveGuardianData() {
    const response = await this.guardianClientService.search();
    const newsData = response.response.results.map((item) => ({
      slug:          item.id,
      title:         item.webTitle,
      content:       item.fields?.body      || '',
      short_content: item.fields?.trailText || '',
      image_url:     item.fields?.thumbnail || '',
      source:        'The Guardian',
      published_at:  new Date(item.webPublicationDate),
      source_url:    item.webUrl,
    }));

    // Handle duplicate data by protecting with index in mongoDB
    await this.newsModel.insertMany(newsData);
  }
}
