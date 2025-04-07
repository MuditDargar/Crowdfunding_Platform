
import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
    {
    name:{type:String, required:true},
    description:{type:String , required:true},
    organizer: {type:String , required:true}, 
    TargetAmount: {type:Number , required:true},
    collectAmount: {type:Number , required:true, default:0},
    Category:{type: String , required:true } ,
    StartDate:{type:String , required:true},
    EndDate : {type:String, required:true },
    isActive:{type:Boolean , required:true , default:true},
    showDonorsINCampaign:{type:Boolean , required:true , default:true} ,
    images:{type:Array , required:true } ,
    createdby:{type:mongoose.Schema.Types.ObjectId , ref:'users' , required:true}

},
{timestamps: true }
); 
if(mongoose.models && mongoose.models.campaigns){
    delete mongoose.models.campaigns ;

}
const CampaignModel = mongoose.model('campaigns' , CampaignSchema);
export default CampaignModel;

