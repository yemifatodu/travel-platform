import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

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

    // Capture the order
    const captureResponse = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const capture = await captureResponse.json();

    if (capture.status === "COMPLETED") {
      return NextResponse.json({
        success: true,
        captureId: capture.id,
        status: capture.status,
      });
    } else {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("PayPal capture error:", error);
    return NextResponse.json(
      { error: "Failed to capture payment" },
      { status: 500 }
    );
  }
}
