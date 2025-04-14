import React from 'react'
import Page from '../sign-in/[[...sign-in]]/page';
import PageTitle from '@/components/page-title';
import { connectDB } from '@/db/config';
import DonationModal from '@/models/donation-model';
import { getCurrentUserDataFromMongoDb } from '@/actions/users';
import DonationTable from '@/components/donation-table';
connectDB();

async function DonationsPage() {
  const mongouser = await getCurrentUserDataFromMongoDb();
  const donations = await DonationModal.find({ userId: mongouser.data._id });
  return (
    <div>
      <PageTitle title="Donations" />

      <DonationTable 
       donations={JSON.parse(JSON.stringify(donations))}
        fromAdmin={false} />
    </div>
  )
}

export default DonationsPage ;
