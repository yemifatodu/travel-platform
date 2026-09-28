import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_TRANSFER_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_TRANSFER_WEBHOOK_SECRET is not configured");

    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("Stripe transfer webhook signature verification failed:", error);

    return NextResponse.json(
      { error: "Invalid Stripe signature" },
      { status: 400 }
    );
  }

  console.log(
    `[Stripe Transfer Webhook] ${event.type} - ${event.id}`
  );

  switch (event.type) {
    case "transfer.created":
      console.log("Transfer created:", event.data.object);
      break;

    case "transfer.updated":
      console.log("Transfer updated:", event.data.object);
      break;

    case "transfer.reversed":
      console.log("Transfer reversed:", event.data.object);
      break;

    default:
      console.log(`Unhandled transfer event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}