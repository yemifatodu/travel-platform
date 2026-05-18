import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`✅ Payment succeeded for eSIM: ${paymentIntent.id}`);
      const { planId, customerEmail, customerName } = paymentIntent.metadata;
      console.log(`📱 eSIM activation for plan ${planId} - Customer: ${customerEmail}`);
      break;

    case "payment_intent.payment_failed":
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log(`❌ Payment failed for eSIM: ${failedPayment.id}`);
      break;

    case "payment_intent.created":
      const createdPayment = event.data.object as Stripe.PaymentIntent;
      console.log(`🆕 Payment intent created: ${createdPayment.id}`);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
