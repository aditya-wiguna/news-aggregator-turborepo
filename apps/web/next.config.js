/** @type {import('next').NextConfig} */
const path = require('path');
const dotenv = require('dotenv');

// Load env vars from root .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  transpilePackages: ['@repo/ui'],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },
};
