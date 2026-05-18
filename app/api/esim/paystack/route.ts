import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, amount, planId, customerName } = await request.json();

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // Convert to kobo/cents
        currency: "USD",
        metadata: {
          planId,
          customerName,
          custom_fields: [
            {
              display_name: "Plan ID",
              variable_name: "plan_id",
              value: planId,
            },
          ],
        },
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`,
      }),
    });

    const data = await response.json();

    if (data.status) {
      return NextResponse.json({
        success: true,
        authorizationUrl: data.data.authorization_url,
        reference: data.data.reference,
      });
    } else {
      return NextResponse.json(
        { error: data.message || "Payment initialization failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Paystack error:", error);
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
