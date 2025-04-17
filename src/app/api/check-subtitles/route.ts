import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function POST(request: Request) {
  try {
    const { videoId } = await request.json();

    if (!videoId) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    if (!YOUTUBE_API_KEY) {
      return NextResponse.json({ error: 'YouTube API key is not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch captions data' }, { status: response.status });
    }

    const data = await response.json();
    const hasSubtitles = data.items && data.items.length > 0;

    return NextResponse.json({
      hasSubtitles,
      captionsData: hasSubtitles ? data.items : null
    });

  } catch (error) {
    console.error('Error checking subtitles:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}