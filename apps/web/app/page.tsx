"use client"
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { NewsCard } from '../components/NewsCard';
import { NewsCardSkeleton } from '../components/NewsCardSkeleton';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useInfiniteNews } from '../hooks/useInfiniteNews';
import { RefreshCw, Newspaper, TrendingUp } from 'lucide-react';

const HomePage: React.FC = () => {
  // Replace with your actual API endpoint
  const API_URL = '/api/news'; // You'll need to create this API route

  const {
    news,
    loading,
    initialLoading,
    error,
    hasMore,
    loadMore,
    refresh,
    searchQuery
  } = useInfiniteNews(API_URL);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Newspaper className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Latest News
              </h1>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <NewsCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            Error loading news: {error}
          </div>
          <button
            onClick={() => refresh()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Newspaper className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Latest News
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-gray-600"
          >
            <TrendingUp className="h-5 w-5" />
            <span>Stay updated with the latest headlines</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-4 w-full max-w-md mx-auto"
          >
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const searchQuery = formData.get('searchQuery') as string;
                // Update the API_URL with search parameter and refresh
                refresh(searchQuery);
              }}
            >
              <input
                type="text"
                name="searchQuery"
                placeholder="Search news..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </form>
          </motion.div>

          {searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-600"
            >
              <span>Showing results for: <span className="font-medium">{searchQuery}</span></span>
              <button
                onClick={() => refresh('')}
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                Clear search
              </button>
            </motion.div>
          )}

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => refresh()}
            className="mt-4 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 mx-auto shadow-sm border border-gray-200 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </motion.button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((newsItem, index) => (
            <NewsCard
              key={newsItem._id}
              news={newsItem}
              index={index}
            />
          ))}
        </div>

        {/* Loading Trigger */}
        {hasMore && (
          <div ref={ref} className="mt-8">
            {loading && <LoadingSpinner />}
          </div>
        )}

        {/* End Message */}
        {!hasMore && news.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-500"
          >
            You've reached the end of the news feed
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
