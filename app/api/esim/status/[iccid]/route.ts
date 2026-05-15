import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { iccid: string } }
) {
  return NextResponse.json({
    success: true,
    data: {
      iccid: params.iccid,
      status: 'active',
      profileStatus: 'downloaded',
      activationDate: new Date().toISOString()
    }
  })
}

export async function PUT(
  request: Request,
  { params }: { params: { iccid: string } }
) {
  try {
    const body = await request.json()

    return NextResponse.json({
      success: true,
      data: {
        iccid: params.iccid,
        ...body
      }
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid request body'
      },
      { status: 400 }
    )
  }
}