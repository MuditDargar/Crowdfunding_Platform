"use server";
// import { currentUser } from "@clerk/nextjs/server";
import { getCurrentUserDataFromMongoDb } from "./users";
import { connectDB } from "@/db/config";
import CampaignModel from "@/models/campaign-model";
import DonationModal from "@/models/donation-model";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
connectDB() ;

export const addNewCampaign= async (reqbody:any) =>{
    try {
        const currentUser =  await getCurrentUserDataFromMongoDb();
        reqbody.createdby = currentUser?.data._id;
        const campaign = new CampaignModel(reqbody);
         await campaign.save();
        revalidatePath("/admin/campaigns");
        return {
            message: "Campaign created successfully",
            
        } ;
    } catch (error:any) {
        return{
        error:error.message ,
        };
    }
}
 
export const editCampaign= async (reqbody:any) =>{
    try {
       await CampaignModel.findOneAndUpdate(
            {_id:reqbody._id},
            {$set:reqbody}
       );
        return {
            message: "Campaign updated successfully",
            
        } ;
    } catch (error:any) {
        return{
        error:error.message ,
        };
    }
}

export const deleteCampaign= async (id:string) =>{
    try {
        await CampaignModel.findByIdAndDelete(id);
        revalidatePath("/admin/campaigns");
        return {
            message: "Campaign deleted successfully",
            
        } ;
    } catch (error:any) {
        return{
        error:error.message ,
        };
    }
} 

export const getCampaignReportById = async (id:string) =>{
    
        try {
            const campaignObjectId = new mongoose.Types.ObjectId(id);
    
            const [donationCount, totalAmountAgg, donations] = await Promise.all([
                DonationModal.countDocuments({ campaignId: id }),
                DonationModal.aggregate([
                    {
                        $match: {
                            campaignId: campaignObjectId,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            totalAmountRaised: { $sum: "$amount" },
                        },
                    },
                ]),
                DonationModal.find({ campaign : id })
                .populate('user')
                .sort({ createdAt: -1 })
                    
            ]);
    
            const totalAmountRaised = totalAmountAgg[0]?.totalAmountRaised || 0;
    
            return {
                data: {
                    donationCount,
                    totalAmountRaised,
                    donations:JSON.parse(JSON.stringify(donations)),
                },
            };
        } catch (error: any) { 
            return {
                error: error.message,
            };
        }
    };