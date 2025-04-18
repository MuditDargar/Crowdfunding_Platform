"use server";

import { connectDB } from "@/db/config";
import { getCurrentUserDataFromMongoDb } from "./users";
import CampaignModel from "@/models/campaign-model";
import DonationModal  from "@/models/donation-model";
import { withSuccess } from "antd/es/modal/confirm";
import { revalidatePath } from "next/cache";
connectDB()

export const addNewDonation = async  (reqbody : any) =>{
    try {
        const mongoUser = await getCurrentUserDataFromMongoDb();
        reqbody.user = mongoUser?.data?._id ;
        const newDonation = new DonationModal(reqbody);
        await newDonation.save() ;
 

        //  update collected amount in campaign 
        const campaign = await CampaignModel.findById(reqbody.campaign) as any ;
        campaign.collectAmount += reqbody.amount ;
        await campaign.save()
        revalidatePath(`/camaigns/${campaign._id}`) ;
        revalidatePath(`/donations/`) ;

        return {
            success: true,
            message: "Donation added successfully",
           
        }
        
    } catch (error:any) {
        return {
            error:error.message ,
        }
    }

}


export const getDonationsByCampaignId = async (campaignid : string) => {
    try{
        const donation = await DonationModal.find({campaign: campaignid}).populate(
            "user"
        ) ;
        return {
            success: true,
            data : JSON.parse(JSON.stringify(donation)) ,
        };

    }
    catch (error:any) {
        return {
            error:error.message ,
        }
    }
}