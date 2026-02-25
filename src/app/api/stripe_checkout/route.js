import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { products } = await request.json(); // total ab optional

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: "No products provided" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: products.map((p) => ({
        price_data: {
          currency: "usd",
          product_data: { name: p.title },
          unit_amount: Math.round(p.price * 100), // per item price in cents
        },
        quantity: p.quantity,
      })),
     success_url: `${process.env.NEXT_JS_URL}/confirm_order?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_JS_URL}/check_out`,
    });

    return NextResponse.json({ message: session });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}