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

    const response1 = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );

    if (!response1.ok) {
      return NextResponse.json({ error: 'Failed to fetch captions data' }, { status: response1.status });
    }

    // const langdata = await response1.json();
    // console.log(langdata.items[0].snippet);
    // const result1 = langdata.items[0].snippet.defaultAudioLanguage.slice(0,2) === 'en'  ? langdata.items[0].snippet.defaultAudioLanguage : false;
     const response2 = await fetch(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${YOUTUBE_API_KEY}`
    );

    if (!response2.ok) {
      return NextResponse.json({ error: 'Failed to fetch captions data' }, { status: response2.status });
    }

     const captiondata = await response2.json();
     let result2 = false;
    if (captiondata.items && captiondata.items.length > 0) {
       result2 = true;
     }
     const result = result2;
    console.log('result:', result); 
    return NextResponse.json({
      result
    });

  } catch (error) {
    console.error('Error checking subtitles:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}