
import DashboardCard from '@/components/dashboard-card';
import PageTitle from '@/components/page-title';
import { connectDB } from '@/db/config';
import CampaignModel from '@/models/campaign-model';
 import DonationModal from '@/models/donation-model';
import React from 'react' ;
import DonationTable from '@/components/donation-table';
import { getCurrentUserDataFromMongoDb } from '@/actions/users';
import mongoose from 'mongoose';

connectDB()

async function Dashboardpage() {
  const mongouser = await getCurrentUserDataFromMongoDb() ;
  const userid =new  mongoose.Types.ObjectId(mongouser.data._id);
  let [donationsCount , amountRaised] = await Promise.all([
    DonationModal.countDocuments({
      user: userid
    }),
    DonationModal.aggregate([
      {
        $match: {
          user: mongouser.data._id
        },
      },
      {
       
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' }
        },
      }
    ])
  ]);

  amountRaised = amountRaised[0]?.totalAmount || 0;

  const  recentdonations = await DonationModal.find({
    user: userid
  }).sort({ createdAt: -1 }).limit(5).populate('campaign');
  return (
    <div>
      <PageTitle title="Dashboard" />
         <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10"> 
      

<DashboardCard  cardTitle='Donations' 
        description='Total number of donations for all campaigns' 
        value={donationsCount.toString()}
        onClickPath = '/admin/donations'
        />

<DashboardCard  cardTitle='Amount Donated' 
        description='Total amount donated for all campaigns' 
        value={`₹ ${amountRaised.toString()}`}
        />
      </div>

      <div className="mt-10">
        <h1 className="text-2xl font-semibold mb-5">Recent Donations</h1>
        <DonationTable donations={JSON.parse(JSON.stringify(recentdonations))} fromAdmin={false} />
        </div>

    </div>
  )
}

export default Dashboardpage ;
