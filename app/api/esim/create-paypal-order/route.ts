import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { amount, currency = "USD", planId, customerEmail } = await request.json();

    // Get PayPal access token
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    const tokenResponse = await fetch(
      `https://api-m.sandbox.paypal.com/v1/oauth2/token`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      }
    );

    const { access_token } = await tokenResponse.json();

    // Create order
    const orderResponse = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: currency,
                value: amount.toString(),
              },
              description: `eSIM Plan ${planId}`,
            },
          ],
          application_context: {
            brand_name: "HUUBOI",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-cancel`,
          },
        }),
      }
    );

    const order = await orderResponse.json();

    return NextResponse.json({
      success: true,
      orderId: order.id,
      approvalUrl: order.links.find((link: any) => link.rel === "approve").href,
    });
  } catch (error) {
    console.error("PayPal error:", error);
    return NextResponse.json(
      { error: "Failed to create PayPal order" },
      { status: 500 }
    );
  }
}
