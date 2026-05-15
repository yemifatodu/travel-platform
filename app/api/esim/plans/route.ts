import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    return NextResponse.json({ 
      success: true,
      plans: [] 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch eSIM plans' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    return NextResponse.json(
      { success: true, message: 'eSIM plan created' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create eSIM plan' },
      { status: 500 }
    )
  }
}
