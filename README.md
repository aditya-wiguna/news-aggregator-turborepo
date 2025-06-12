# News Aggregator

News aggregation platform built with a monorepo architecture, combining data from The Guardian and News API to provide a comprehensive news browsing experience.

## Project Overview

This project uses a monorepo structure with Turborepo to manage both the backend (NestJS) and frontend (Next.js) applications. It aggregates news from multiple sources, stores them in a MongoDB database, and serves them through a unified API.

## Features

- **News Aggregation**: Combines news from The Guardian and News API
- **Responsive UI**: Modern, responsive interface built with Next.js and Tailwind CSS
- **Infinite Scrolling**: Load more news as you scroll down the page
- **Search Functionality**: Search for news by keywords
- **Caching**: Redis-based caching for improved performance
- **Scheduled Updates**: Automatic hourly updates of news data

## API Endpoints

- `/api/news` - Get paginated news articles with search functionality ✅
- `/api/health` - Check API health status ✅

### Implementation Notes

- **Category Filtering**: Not implemented due to different category codes between news sources
- **Detail News**: Not available as News API doesn't provide detailed article content

## Tech Stack

### Backend (NestJS)

- **NestJS**: Progressive Node.js framework
- **MongoDB**: Document database for storing news articles
- **Redis**: In-memory data store for caching
- **Mongoose**: MongoDB object modeling
- **Axios**: HTTP client for API requests
- **Cron Jobs**: Scheduled tasks for data synchronization

### Frontend (Next.js)

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Axios**: HTTP client for API requests

## Prerequisites

- **Node.js**: Version 22 or higher
- **MongoDB**: Running instance (local or remote)
- **Redis**: Running instance (local or remote)

## Installation

1. Clone the repository

```bash
git clone https://github.com/aditya-wiguna/news-aggregator-turborepo.git
cd news-aggregator-turborepo
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
GUARDIAN_API_URL=https://content.guardianapis.com
GUARDIAN_API_KEY=your_guardian_api_key

NEWS_API_KEY=your_news_api_key
NEWS_API_URL=https://newsapi.org

DATABASE_URI=mongodb://localhost:27017/news_aggregator
REDIS_URL=redis://localhost:6379/0

NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start both the API (http://localhost:3000) and Web (http://localhost:3001) applications in development mode.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
├── apps/
│   ├── api/                 # NestJS backend application
│   └── web/                 # Next.js frontend application
├── packages/
│   ├── api/                 # Shared API types and interfaces
│   ├── eslint-config/       # Shared ESLint configuration
│   ├── jest-config/         # Shared Jest configuration
│   ├── typescript-config/   # Shared TypeScript configuration
│   └── ui/                  # Shared UI components
├── .env                     # Environment variables
└── package.json             # Root package.json
```

## License

UNLICENSED
