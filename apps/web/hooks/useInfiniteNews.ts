import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { NewsItem, NewsResponse } from '../types/news';

export const useInfiniteNews = (apiUrl: string) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchNews = useCallback(async (page: number, reset = false, search?: string) => {
    try {
      if (page === 1) {
        setInitialLoading(true);
      } else {
        setLoading(true);
      }

      setError(null);

      // If search is provided, update the searchQuery state
      if (search !== undefined) {
        setSearchQuery(search);
      }

      // Use the provided search parameter or the current searchQuery state
      const currentSearch = search !== undefined ? search : searchQuery;

      // Build the URL with search parameter if it exists
      let url = `${apiUrl}?page=${page}&limit=10`;
      if (currentSearch) {
        url += `&search=${encodeURIComponent(currentSearch)}`;
      }

      const response = await axios.get<NewsResponse>(url);

      if (response.data.status === 200) {
        const newNews = response.data.data;

        if (reset) {
          setNews(newNews);
        } else {
          setNews(prev => [...prev, ...newNews]);
        }

        setHasMore(page < response.data.meta.total_pages);
        setCurrentPage(page);
      } else {
        throw new Error('Failed to fetch news');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [apiUrl, searchQuery]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchNews(currentPage + 1);
    }
  }, [loading, hasMore, currentPage, fetchNews]);

  const refresh = useCallback((search?: string) => {
    setCurrentPage(1);
    fetchNews(1, true, search);
  }, [fetchNews]);

  useEffect(() => {
    fetchNews(1, true);
  }, [fetchNews]);

  return {
    news,
    loading,
    initialLoading,
    error,
    hasMore,
    loadMore,
    refresh,
    searchQuery
  };
};
