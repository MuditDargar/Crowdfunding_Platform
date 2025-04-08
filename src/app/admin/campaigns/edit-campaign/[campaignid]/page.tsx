export const dynamic= "force-dynamic" ;

import React from 'react'
import PageTitle from '@/components/page-title'
import CampaignForm from '../../_components/campaign-form'
import { connectDB } from '@/db/config'
import CampaignModel from '@/models/campaign-model'

connectDB() ;

interface PageProps {
  params: Promise<{ campaignid: string }>
}

async function EditCampaignPage({params}: PageProps) {

  const { campaignid } =await  params ;
  
 const campaign = await CampaignModel.findById(campaignid) 


  return (
    <div>
     <PageTitle title="Edit Campaign" />
     { campaign &&
     <CampaignForm
     isEditForm={true}
      initialData={JSON.parse(JSON.stringify(campaign))}
       />
}
    </div>
  )
} 

export default EditCampaignPage
