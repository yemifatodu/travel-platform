import { NextResponse } from 'next/server'

export async function GET() {
  const mockPlans = [
    {
      id: '1',
      name: 'USA eSIM',
      country_name: 'United States',
      data: '5GB',
      price: 19.99,
      validity: '30 days',
      description: 'Perfect for short trips to the US',
      image: '/images/esim/usa.jpg'
    },
    {
      id: '2',
      name: 'Europe eSIM', 
      country_name: 'Europe (30+ countries)',
      data: '10GB',
      price: 29.99,
      validity: '30 days',
      description: 'Coverage across 30+ European countries',
      image: '/images/esim/europe.jpg'
    },
    {
      id: '3',
      name: 'Global eSIM',
      country_name: 'Worldwide',
      data: '20GB', 
      price: 49.99,
      validity: '60 days',
      description: 'Worldwide coverage in 100+ countries',
      image: '/images/esim/global.jpg'
    }
  ]
  
  return NextResponse.json({ 
    success: true, 
    data: mockPlans  // Return as 'data' to match the frontend expectation
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ 
      success: true, 
      message: 'eSIM plan created successfully',
      data: body 
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Invalid request body' 
    }, { status: 400 })
  }
}
