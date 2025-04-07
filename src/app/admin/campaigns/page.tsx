
import React from "react";
import PageTitle from "@/components/page-title";
import LinkButton from "@/components/link-button";
import CampaignModel from "@/models/campaign-model";
import { connectDB } from "@/db/config";
import CampaignsTable from "./_components/campaign-table";
import { json } from "stream/consumers";

connectDB() ;
async function  Campaignpage() {
  const campaigns : CampaignType[] = (await  CampaignModel.find().sort({ createdAt: -1 })) as  any ;
  return(
     <div  >
<div className="flex justify-between items-center">
<PageTitle title="Campaigns" />
<LinkButton title="Create Campaign" path="/admin/campaigns/new-campaign" />
</div>
<CampaignsTable campaigns={JSON.parse(JSON.stringify(campaigns))} />
    </div>
)}

export default Campaignpage;
