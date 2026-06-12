import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '50');

  if (!query || query.trim().length === 0) {
    return NextResponse.json({
      success: false,
      error: 'Search query required'
    }, { status: 400 });
  }

  try {
    // Method 1: Using ilike for case-insensitive search
    let supabaseQuery = supabase
      .from('plans')
      .select('*');
    
    // Add search conditions
    supabaseQuery = supabaseQuery.or(
      `country_name.ilike.%${query}%,country_code.ilike.%${query}%`
    );
    
    const { data: plans, error } = await supabaseQuery
      .order('country_name', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        success: false,
        error: 'Database search failed'
      }, { status: 500 });
    }

    // If no results with OR, try text search
    let finalPlans = plans || [];
    
    if (finalPlans.length === 0) {
      const { data: textSearchPlans, error: textError } = await supabase
        .from('plans')
        .select('*')
        .textSearch('country_name', query, {
          type: 'websearch',
          config: 'english'
        })
        .limit(limit);
      
      if (!textError && textSearchPlans) {
        finalPlans = textSearchPlans;
      }
    }

    return NextResponse.json({
      success: true,
      data: finalPlans,
      count: finalPlans.length,
      query: query
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to search eSIM plans'
    }, { status: 500 });
  }
}