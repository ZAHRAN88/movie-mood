
import { getMoviesByMood } from '@/lib/tmdb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get('mood');

  if (!mood) {
    return NextResponse.json({ error: 'Mood parameter is required' }, { status: 400 });
  }

  try {
    const movies = await getMoviesByMood(mood);
    return NextResponse.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}