import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { NewsItem } from '../types/news';
import { Calendar, ExternalLink, User } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  index: number;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, index }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
            {news.title}
          </CardTitle>
          <CardDescription className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{news.source}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(news.published_at)}</span>
            </div>
          </CardDescription>
        </CardHeader>

        <div className="px-6 pb-3">
          <img
            src={(news.image_url == '' || news.image_url == null) ? 'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg' : news.image_url}
            alt={news.title}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <CardContent className="pt-0">
          {news.short_content && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {news.short_content}
            </p>
          )}

          <a
            href={news.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            Read more
            <ExternalLink className="h-4 w-4" />
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
};
