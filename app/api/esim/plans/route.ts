import { NextResponse } from 'next/server'

export async function GET() {
  const mockPlans = [
    {
      id: '1',
      name: 'USA eSIM',
      country_name: 'United States',
      data_amount: '5 GB',
      validity_days: 30,
      retail_price: 19.99,
      currency: 'USD',
      description: 'Perfect for short trips to the US',
      image: '/images/esim/usa.jpg',
      popular: true
    },
    {
      id: '2',
      name: 'Europe eSIM', 
      country_name: 'Europe (30+ countries)',
      data_amount: '10 GB',
      validity_days: 30,
      retail_price: 29.99,
      currency: 'USD',
      description: 'Coverage across 30+ European countries',
      image: '/images/esim/europe.jpg',
      popular: true
    },
    {
      id: '3',
      name: 'Global eSIM',
      country_name: 'Worldwide',
      data_amount: '20 GB', 
      validity_days: 60,
      retail_price: 49.99,
      currency: 'USD',
      description: 'Worldwide coverage in 100+ countries',
      image: '/images/esim/global.jpg',
      popular: false
    }
  ]
  
  return NextResponse.json({ 
    success: true, 
    data: mockPlans
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ 
      success: true, 
      message: 'Order placed successfully',
      order: {
        id: Math.random().toString(36).substr(2, 9),
        ...body
      }
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Invalid request body' 
    }, { status: 400 })
  }
}
