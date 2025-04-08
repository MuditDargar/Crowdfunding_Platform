"use server";
// import { currentUser } from "@clerk/nextjs/server";
import { getCurrentUserDataFromMongoDb } from "./users";
import { connectDB } from "@/db/config";
import CampaignModel from "@/models/campaign-model";
import { revalidatePath } from "next/cache";
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