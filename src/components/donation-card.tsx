// "use client";

// import React, { useEffect, useState } from "react";
// import { Button, Input, Progress, message as AntMessage } from "antd";
// // import { CampaignType } from "@/interfaces";
// const { TextArea } = Input;

// interface CampaignType {
//   collectAmount: number;
//   TargetAmount: number;
//   _id: string; // assuming you have a unique campaign ID
// }

// interface DonationCardProps {
//   campaign: CampaignType;
// }

// function DonationCard({ campaign }: DonationCardProps) {
//   const [amount, setamount] = useState<number>();
//   const [message, setmessage] = useState("");
//   const collectedpercentage = (campaign.collectAmount / campaign.TargetAmount) * 100;

//   // Load Razorpay checkout script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handleDonate = async () => {
//     try {
//       const res = await fetch("/api/razorpay/create-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount: amount! * 100 }), // Convert to paisa
//       });

//       const data = await res.json();

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//         amount: data.amount,
//         currency: data.currency,
//         name: "Raise IT - Crowdfunding",
//         description: "Donation",
//         order_id: data.id,
//         handler: function (response: any) {
//           AntMessage.success("Donation successful!");
//           console.log("Payment response", response);
//           // Here you can call a backend API to save the donation
//         },
//         prefill: {
//           name: "Donor",
//           email: "donor@example.com",
//           contact: "9000000000",
//         },
//         notes: {
//           campaignId: campaign._id,
//           message: message,
//         },
//         theme: {
//           color: "#164863",
//         },
//       };

//       const razor = new (window as any).Razorpay(options);
//       razor.open();
//     } catch (error) {
//       console.error(error);
//       AntMessage.error("Something went wrong. Try again.");
//     }
//   };

//   return (
//     <div className="border border-solid border-gray-400 rounded p-4 flex flex-col">
//       <span className="text-xl text-[#164863] font-semibold">
//         ₹ {campaign.collectAmount} raised of ₹ {campaign.TargetAmount}
//       </span>
//       <Progress percent={collectedpercentage} />
//       <span className="text-sm text-gray-600 mt-2">
//         No donation yet. Be the first to donate to this campaign
//       </span>

//       <div className="flex flex-col gap-5 mt-5">
//         <Input
//           placeholder="Amount"
//           type="number"
//           onChange={(e) => setamount(parseInt(e.target.value))}
//           value={amount}
//           className="p-3"
//         />
//         <TextArea
//           placeholder="Message"
//           rows={4}
//           onChange={(e) => setmessage(e.target.value)}
//           value={message}
//         />
//         <Button type="primary" block disabled={!amount} onClick={handleDonate}>
//           Donate
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default DonationCard;

"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Progress, message as AntMessage, Modal } from "antd";
import { connectDB } from "@/db/config";
import {CheckoutProvider} from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { getStripeClientSecret } from "@/actions/payment";
import { set } from "mongoose";
import PaymentModel from "./payment-model";
const { TextArea } = Input;
connectDB();

interface CampaignType {
  collectAmount: number;
  TargetAmount: number;
  _id: string;
}

interface DonationCardProps {
  campaign: CampaignType;
  donations ?: DonationType[];
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


function DonationCard({ campaign , donations=[]}: DonationCardProps) {
  const [ShowAllDonations , setShowAllDonations] = useState<Boolean>(false);
  const [showPaymentForm , setShowPaymentForm] = useState<boolean>(false);
  const [loading , setLoading] = React.useState<Boolean>(false);
  const [clientSecret, setClientSecret] = React.useState<String>("") ;
   const [amount, setamount] = useState<number>();
  const [message, setmessage] = useState("");
 

  const collectedpercentage =(campaign.collectAmount / campaign.TargetAmount) * 100;


  const getclientsecret = async (amount: number) => {
    try {
      setLoading(true);
      const response = await getStripeClientSecret({
        amount: amount * 100, // convert to paisa
     
      })
      if(response.error) throw new Error(response.error.message);
     setClientSecret(response.clientSecret);
     console.log("client secret", response.clientSecret);
      setShowPaymentForm(true);
    } catch (error) {
      
    }
    finally{
      setLoading(false);
    }
  }

  const  getaRecentDonations = () => {
   // if(donations?.length === 0){
      //  return (
        // <span className="text-sm text-gray-600 mt-2">
        //   No donation yet. Be the first to donate to this campaign
        // </span>
   //   );
   // };
  
      return (
        <div className="flex flex-col gap-2">
          {donations?.map((donation) => (
            <div key={donation._id} className="border-gray-400 bg-gray-100 rounded-sm p-4 flex flex-col">
              <span className="text-sm text-gray-600 mt-2 font-semibold">
                {donation.user.userName} donated ₹{donation.amount}
              </span>
              <span className="text-sm text-gray-600 mt-2">
                "{donation.message}"
              </span>
            </div>
          ))}
        </div>
      );
    
  };
  
  return (
    <div className="border border-solid border-gray-400 rounded p-4 flex flex-col">
      <span className="text-xl text-[#164863] font-semibold">
        ₹ {campaign.collectAmount} raised of ₹ {campaign.TargetAmount}
      </span>
      <Progress percent={collectedpercentage} />
      <span className="text-gray-600 text-sm font-semibold mt-2" >
        Recent Donation
      </span>
      <div className="flex flex-col gap-1 my-3">{getaRecentDonations()}</div>

{donations?.length  > 0 && (
  <span className="text-sm text-[#164863] font-semibold  cursor-pointer underline mt-10 "
  onClick={() => setShowAllDonations(true)}
  >
    View all (" ")
  </span> 
)}


<hr className="my-3"  />

      <span className="text-sm text-gray-600 mt-2">
        No donation yet. Be the first to donate to this campaign
      </span>

      <div className="flex flex-col gap-5 mt-5">
        <Input
          placeholder="Amount"
          type="number"
          onChange={(e) => setamount(parseInt(e.target.value))}
          value={amount}
          className="p-3"
        />
        <TextArea
          placeholder="Message"
          rows={4}
          onChange={(e) => setmessage(e.target.value)}
          value={message}
        />
        <Button
          type="primary"
          block
          disabled={!amount }
          onClick={()=>getclientsecret(amount!)}
           loading={loading}
        >
          Donate
        </Button>
      </div>
      {showPaymentForm &&  clientSecret && (
        <Modal  open={showPaymentForm} 
        onCancel={()=>{
          setShowPaymentForm(false);
          setClientSecret("");
        }
      }
         footer={null} width={600} title="Complete your donation payment">
        <Elements stripe={stripePromise}
         options={{
          clientSecret: clientSecret
          }}>
          <PaymentModel 
          messageText={message}
          campaign={campaign}
          amount={amount || 0}
          /> 
        </Elements>
      </Modal>
      )
        }

<Modal  open={ShowAllDonations} 
        onCancel={()=>{
         setShowAllDonations(false);
        }
      }
         footer={null} width={600} title="All donation for this campaign">
        <Elements stripe={stripePromise}
         options={{
          clientSecret: clientSecret
          }}>
          <PaymentModel 
          messageText={message}
          campaign={campaign}
          amount={amount || 0}
          /> 
        </Elements>
      </Modal>
      
    </div>
  );
}

export default DonationCard;














// Load Razorpay script
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // const handleDonate = async () => {
  //   if (!amount || amount <= 0) {
    //   AntMessage.warning("Please enter a valid amount.");
    //   return;
    // }

    // setLoading(true);
    // try {
    //   // Create Razorpay order
    //   const res = await fetch("/api/create-order", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ amount: amount * 100 }), // in paisa
    //   });

    //   const data = await res.json();

  //     const options = {
  //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  //       amount: data.amount,
  //       currency: data.currency,
  //       name: "Raise IT - Crowdfunding",
  //       description: "Donation",
  //       order_id: data.id,
  //       handler: async function (response: any) {
  //         AntMessage.success("Donation successful!");

  //         // Save donation to backend
  //         await fetch("/api/razorpay/save-donation", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             campaignId: campaign._id,
  //             amount,
  //             message,
  //             razorpayPaymentId: response.razorpay_payment_id,
  //             razorpayOrderId: response.razorpay_order_id,
  //             razorpaySignature: response.razorpay_signature,
  //           }),
  //         });

  //         // Optionally reset fields or refresh campaign state
  //         setamount(undefined);
  //         setmessage("");
  //       },
  //       prefill: {
  //         name: "Donor",
  //         email: "donor@example.com",
  //         contact: "9000000000",
  //       },
  //       notes: {
  //         campaignId: campaign._id,
  //         message: message,
  //       },
  //       theme: {
  //         color: "#164863",
  //       },
  //     };

  //     const razor = new (window as any).Razorpay(options);
  //     razor.open();
  //   } catch (error) {
  //     console.error("Payment Error:", error);
  //     AntMessage.error("Something went wrong. Try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

