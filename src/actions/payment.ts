"use server"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!);

export const getStripeClientSecret = async (reqbody:any)=>{
    try{
    const paymentIntent = await stripe.paymentIntents.create({
        amount: reqbody.amount,
        currency: "INR",
        payment_method_types: ["card"],
        description:"RaiseIt payemnts",
       
    });
    return {
        clientSecret : paymentIntent.client_secret,
        message: "Payment intent created successfully",
    }
    }
    catch(error:any){
        console.log("PaymentIntent error:", error.message);
       
    }

}