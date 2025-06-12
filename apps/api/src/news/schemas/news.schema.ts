import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema({ timestamps: true })
export class News {
  @Prop({ unique: true, required: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  content: string;

  @Prop({ default: '' })
  short_content: string;

  @Prop({ default: '' })
  source: string;

  @Prop({ default: Date.now })
  published_at: Date;

  @Prop({ default: '' })
  source_url: string;

  @Prop({ default: '' })
  image_url: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
