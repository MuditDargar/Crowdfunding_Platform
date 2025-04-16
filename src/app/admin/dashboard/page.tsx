import DashboardCard from '@/components/dashboard-card';
import PageTitle from '@/components/page-title';
import { connectDB } from '@/db/config';
import CampaignModel from '@/models/campaign-model';
 import DonationModal from '@/models/donation-model';
import React from 'react'

connectDB()

async function Dashboardpage() {

  const [campaignsCount , donationsCount , amountRaised] = await Promise.all([
    CampaignModel.countDocuments({}),
    DonationModal.countDocuments({}),
    DonationModal.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: 'amount' }
        }
      }
    ])
  ])


  return (
    <div>
      <PageTitle title="Dashboard" />


      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10"> 
        <DashboardCard  cardTitle='campaigns' 
        description='Total number of campaigns including active and inactive' 
        value='100'
        onClickPath = '/admin/campaigns'
        />

<DashboardCard  cardTitle='Donations' 
        description='Total number of donations done by users for all campaigns' 
        value='69'
        onClickPath = '/admin/donations'
        />

<DashboardCard  cardTitle='Amount Raised' 
        description='Total amount raised by all campaigns   including active and inactive' 
        value='₹ 774'
        />
      </div>
    </div>
  )
}

export default Dashboardpage ;
