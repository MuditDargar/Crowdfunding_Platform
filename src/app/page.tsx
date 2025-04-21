

// import { handleNewUserRegistration } from "@/actions/users";
// import CampaignCard from "@/components/campaign-card";

// import { connectDB } from "@/db/config";
// import CampaignModel from "@/models/campaign-model";
// export const dynamic = "force-dynamic";
// connectDB();

// interface Props {
//   searchParams?: {
//     category?: string;
//     organizer?: string;
//   };
// }
// export default async function Home({searchParams}: Props) {

// await handleNewUserRegistration() ;



// const campaigns : CampaignType[] = (await CampaignModel.find(filters).sort({
//   createdAt: -1 ,
// })) as any ;

//   return (
//     <div >
//       <Filters />
//      <div className="grid grid-cols-4 gap-7">
//   {campaigns.map((campaign) => (
//     <CampaignCard 
//       key={campaign._id } 
//       campaign={JSON.parse(JSON.stringify(campaign))} 
//     />
//   ))}
// </div>
//     </div>
//   );
// }


import { handleNewUserRegistration } from "@/actions/users";
import CampaignCard from "@/components/campaign-card";
import { connectDB } from "@/db/config";
import CampaignModel from "@/models/campaign-model";

export const dynamic = "force-dynamic";
connectDB();

export default async function Home() {
  await handleNewUserRegistration();

  const campaigns: CampaignType[] = (await CampaignModel.find().sort({
    createdAt: -1,
  })) as any;

  return (
    <div>
      <div className="grid grid-cols-4 gap-7">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign._id}
            campaign={JSON.parse(JSON.stringify(campaign))}
          />
        ))}
      </div>
    </div>
  );
}
