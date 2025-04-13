import React, { useState } from "react";
import { AddressElement, PaymentElement , useStripe , useElements } from "@stripe/react-stripe-js";
import { Button, message } from "antd";
import { GenericHTMLFormElement } from "axios";
import { addNewDonation } from "@/actions/donation";
import { useRouter } from "next/navigation";


interface PaymentModelProps {
    campaign : CampaignType,
    amount: number ,
    messageText  : string,
}


function PaymentModel({campaign , amount , messageText} : PaymentModelProps) {
    const [loading,setloading]=useState(false) ;
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter() ;

const onSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{

try {
    setloading(true);
    event.preventDefault();
if (!stripe || !elements) {
    return ;
}

const result = await stripe.confirmPayment({
    elements,
    confirmParams: {
        return_url: "http://localhost:3001/donations",
    },
    redirect: "if_required",
});


if (result.error) {
    message.error(result.error.message);
    console.log(result.error.message);
}
else{

    const donationPayload  =  {
        campaign:campaign._id,
        amount ,
        message : messageText ,
        paymentId : result.paymentIntent?.id ,

    }
    await addNewDonation(donationPayload)
    message.success("Donation successful");
    router.push("/donations")
 
}
} catch (error:any) {
    message.error(error.message)
}
finally {
    setloading(false) ;
}
}



 
  return ( 
   <form
   onSubmit={onSubmit}
   >
    <PaymentElement />
    <AddressElement
    options={
        {
            allowedCountries: ["US"],
            mode: "shipping",
        }
    }
     />
    <div className="flex gap-5 justify-end mt-5">
        <Button> Cancel</Button>
        <Button  type="primary" htmlType="submit" loading={loading}>
        Pay
        </Button>
    </div>
   </form>
  );
}
export default PaymentModel;