"use client" ;
import React from "react";
import { Progress } from "antd";
import { useRouter } from "next/navigation" ;

interface CampaignCardProps {
    campaign : CampaignType ;
}

function CampaignCard({campaign} : CampaignCardProps) {
    const router = useRouter() ;
    const mainimalImage = campaign.images[0] ;
    const collectedpercentage = (campaign.collectAmount / campaign.TargetAmount) * 100 ;
    return (
        <div className=" border rounded border-gray-400 border-solid hover:shadow-lg hover:shadow-gray-400 transition duration-300 ease-in-out cursor-pointer"
        onClick={() => {
            router.push(`/campaign/${campaign._id}`) ;
        } }
        >
        <img src={mainimalImage} alt="Campaign Image" className="w-full h-60 object-cover rounded-t" />
        <div className="p-4">
            <h1 className="text-md font-semibold text-[#164863]">{campaign.name}</h1>
            <Progress percent={collectedpercentage} />
            <span className="text-sm text-gray-500"> 
            ₹ {campaign.collectAmount} raised of ₹ {campaign.TargetAmount} 
            </span>
         </div>    
        </div>
    );
    }
export default CampaignCard;


