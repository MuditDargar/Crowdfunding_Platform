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