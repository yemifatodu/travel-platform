import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    success: true,
    data: {
      id: params.id,
      message: 'Order details fetched successfully'
    }
  })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    return NextResponse.json({
      success: true,
      data: {
        id: params.id,
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    success: true,
    message: 'Order ' + params.id + ' deleted successfully'
  })
}