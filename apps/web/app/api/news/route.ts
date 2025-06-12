import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  const search = searchParams.get('search') || '';

  try {
    // Connect to the NestJS API with the correct endpoint
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
      params: { page, limit, search }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        message: 'Failed to fetch news',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
