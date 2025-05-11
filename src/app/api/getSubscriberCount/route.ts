import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
// GET: Fetch user's chat usage count
export async function GET() {
  try {
    
    const { data, error,count } = await supabase
      .from('mindmap_usage')
      .select('isPaid', { count: 'exact' })  // Use 'exact' to get the precise count
      .eq('isPaid', true); 
      const result = 100- (count|| 0);
    if (error) {
      console.log(data,error)
    }
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error fetching chat usage:', error);
    return NextResponse.json({ error: 'Failed to fetch chat usage' }, { status: 500 });
  }
}