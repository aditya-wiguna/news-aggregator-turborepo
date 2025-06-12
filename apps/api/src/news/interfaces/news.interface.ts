import { Document } from 'mongoose';

export interface News extends Document {
  slug: string;
  title: string;
  content: string;
  short_content: string;
  source: string;
  published_at: Date;
  source_url: string;
  image_url: string;
}
