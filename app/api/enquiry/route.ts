import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, email, phone, whatsapp,
      destination, package_name,
      travel_dates, duration, guests,
      budget, message, trip_type
    } = body

    if (!name || !email || !destination) {
      return NextResponse.json({ error: 'Name, email and destination are required' }, { status: 400 })
    }

    const RESEND_KEY = process.env.RESEND_API_KEY

    const emailBody = `
NEW TRIP ENQUIRY — HUUBOI.COM
==============================

FROM: ${name}
EMAIL: ${email}
PHONE: ${phone || 'Not provided'}
WHATSAPP: ${whatsapp || 'Not provided'}

TRIP DETAILS
------------
Destination: ${destination}
Package: ${package_name || 'Custom / Open'}
Trip Type: ${trip_type || 'Not specified'}
Travel Dates: ${travel_dates || 'Flexible'}
Duration: ${duration || 'Not specified'}
Number of Guests: ${guests || 'Not specified'}
Budget: ${budget || 'Not specified'}

MESSAGE FROM CLIENT
-------------------
${message || 'No additional message'}

==============================
Reply to this email or WhatsApp the client directly.
Sent from huuboi.com/request-trip
    `.trim()

    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'HUUBOI Enquiries <enquiries@huuboi.com>',
          to: ['hello@huuboi.com'],
          reply_to: email,
          subject: `New Trip Enquiry — ${destination} — ${name}`,
          text: emailBody,
        }),
      })

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Yemi at HUUBOI <hello@huuboi.com>',
          to: [email],
          subject: `We received your enquiry — ${destination}`,
          text: `Hi ${name},

Thank you for reaching out to HUUBOI.

We have received your trip enquiry for ${destination} and will get back to you within 24 hours with a personalised quote.

YOUR ENQUIRY SUMMARY
--------------------
Destination: ${destination}
Travel Dates: ${travel_dates || 'Flexible'}
Guests: ${guests || 'Not specified'}
Budget: ${budget || 'Not specified'}

While you wait, feel free to explore more destinations at huuboi.com or WhatsApp us directly for a faster response.

Best regards,
Yemi Fatodu
Founder, HUUBOI.COM
hello@huuboi.com
huuboi.com`,
        }),
      })
    }

    try {
      const { createClient } = await import('@supabase/supabase-js')
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        )
        await supabase.from('trip_enquiries').insert({
          name, email, phone, whatsapp,
          destination, package_name,
          travel_dates, duration,
          guests: guests ? parseInt(guests) : null,
          budget, message, trip_type,
          status: 'new',
          created_at: new Date().toISOString(),
        })
      }
    } catch {
      // Supabase save optional — does not fail the request
    }

    return NextResponse.json({ success: true, message: 'Enquiry received' })

  } catch (err) {
    console.error('Enquiry error:', err)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}

