 import { NextRequest,NextResponse } from "next/server";
 import Razorpay from "razorpay";

 const razorpay = new Razorpay({
   key_id: process.env.RAZORPAY_KEY_ID!,
   key_secret: process.env.RAZORPAY_SECRET!,
 });

 export async function POST(req: NextRequest) {
try {
    const order= await razorpay.orders.create({
        amount: 100*100, // Amount in rs
        currency: "INR",
        receipt: "receipt" + Math.random().toString(36).substring(7),
});
    
   return NextResponse.json({ id:order.id} , {status:200});
     
    }
    catch (error) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}