
import { handleNewUserRegistration } from "@/actions/users";
import CampaignCard from "@/components/campaign-card";
import { connectDB } from "@/db/config";
import CampaignModel from "@/models/campaign-model";
connectDB();

export default async function Home() {

await handleNewUserRegistration() ;
const campaigns : any = (await CampaignModel.find({}).sort({
  createdAt: -1 ,
}))  ;

  return (
    <div >
     <div className="grid grid-cols-4 gap-7">
  {campaigns.map((campaign:any) => (
    <CampaignCard 
      key={campaign._id } 
      campaign={JSON.parse(JSON.stringify(campaign))} 
    />
  ))}
</div>
    </div>
  );
}
