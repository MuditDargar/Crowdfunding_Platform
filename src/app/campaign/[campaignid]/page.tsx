import CampaignModel from "@/models/campaign-model";
import { connectDB } from "@/db/config";
import React from "react";
import LinkButton from "@/components/link-button";
import DonationCard from "@/components/donation-card";


connectDB() ;

interface SingleCampaignPageProps {
    params : {
        campaignid : string ;
    }

}

async function SingleCampaignPage({params} : SingleCampaignPageProps) {
    const campaign : CampaignType = await CampaignModel.findById(params.campaignid) as any ;

const getproperty= (key:string,value:any) => {
    return(
        <div className="flex flex-col  gap-3 text-sm">
            <h1 className="text-gray-800 font-bold">{key}:</h1>
            <h1 className="text-gray-600 font-normal">{value}</h1>
        </div>
    )
};

    
return(
    campaign && (
    <div className="flex flex-col gap-5 ">
       <LinkButton title="Back to Campaigns" 
        path="/"
       />
       <h1 className="text-2xl font-bold text-gray-600">{campaign?.name}</h1>
       <div className="grid md:grid-cols-3 gap-7 grid-cols-1">
        <div className="col-span-2 flex flex-col gap-7">
            <div className="flex flex-wrap gap-5">
                {campaign.images.map((image : string) => (
                    <img src={image} alt="Campaign Image" className="w-[35%] h-60 object-cover rounded mb-5" />
                ))}
            </div>
          <div className="grid grid-cols-1  md:grid-cols-3 gap-5">
            {getproperty("Organizer",campaign.organizer)}
            {getproperty("Start Date",campaign.StartDate)}
            {getproperty("End Date",campaign.EndDate)}
            {getproperty("Target Amount",`₹ ${campaign.TargetAmount}`)}
            {getproperty("Collected Amount",`₹ ${campaign.collectAmount}`)}
          </div>
          <p className="text-md text-gray-600">{campaign.description} </p>
        </div>
        <div className="col-span-1">
            <DonationCard campaign={
                JSON.parse(JSON.stringify(campaign))
            } />
        </div>
       </div>
    </div>
    )
)
}

export default SingleCampaignPage;