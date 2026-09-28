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

  const webhookSecret = process.env.STRIPE_ACTIVITIES_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_ACTIVITIES_WEBHOOK_SECRET is not configured");

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
    console.error(
      "Stripe activities webhook signature verification failed:",
      error
    );

    return NextResponse.json(
      { error: "Invalid Stripe signature" },
      { status: 400 }
    );
  }

  console.log(
    `[Stripe Activities Webhook] ${event.type} - ${event.id}`
  );

  console.log("Stripe event:", event);

  return NextResponse.json({ received: true });
}