"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Progress, message as AntMessage } from "antd";
// import { CampaignType } from "@/interfaces";
const { TextArea } = Input;

interface CampaignType {
  collectAmount: number;
  TargetAmount: number;
  _id: string; // assuming you have a unique campaign ID
}

interface DonationCardProps {
  campaign: CampaignType;
}

function DonationCard({ campaign }: DonationCardProps) {
  const [amount, setamount] = useState<number>();
  const [message, setmessage] = useState("");
  const collectedpercentage = (campaign.collectAmount / campaign.TargetAmount) * 100;

  // Load Razorpay checkout script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDonate = async () => {
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount! * 100 }), // Convert to paisa
      });

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: data.currency,
        name: "Raise IT - Crowdfunding",
        description: "Donation",
        order_id: data.id,
        handler: function (response: any) {
          AntMessage.success("Donation successful!");
          console.log("Payment response", response);
          // Here you can call a backend API to save the donation
        },
        prefill: {
          name: "Donor",
          email: "donor@example.com",
          contact: "9000000000",
        },
        notes: {
          campaignId: campaign._id,
          message: message,
        },
        theme: {
          color: "#164863",
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      AntMessage.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="border border-solid border-gray-400 rounded p-4 flex flex-col">
      <span className="text-xl text-[#164863] font-semibold">
        ₹ {campaign.collectAmount} raised of ₹ {campaign.TargetAmount}
      </span>
      <Progress percent={collectedpercentage} />
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
        <Button type="primary" block disabled={!amount} onClick={handleDonate}>
          Donate
        </Button>
      </div>
    </div>
  );
}

export default DonationCard;