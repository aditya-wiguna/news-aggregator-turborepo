export interface NewsItem {
  _id: string;
  slug: string;
  title: string;
  content: string;
  short_content: string;
  source: string;
  published_at: string;
  source_url: string;
  image_url: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewsResponse {
  status: number;
  message: string;
  data: NewsItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
