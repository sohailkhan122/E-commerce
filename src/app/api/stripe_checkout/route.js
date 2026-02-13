import { Quando } from "next/font/google";
import { NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    const { products, total } = await request.json();
    console.log("Received products:", products);
    console.log("Received total:", total);

    const session = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_JS_URL}/confirm_order`,
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: products.map(p => p.title).join(', '), // Combine product names
                    },
                    unit_amount: total * 100, // Convert to cents
                },
                quantity: products.reduce((acc, p) => acc + p.quantity, 0), // Total quantity of all products
            }
        ],
        mode: 'payment',
    });
    return NextResponse.json({ message: session });
}
