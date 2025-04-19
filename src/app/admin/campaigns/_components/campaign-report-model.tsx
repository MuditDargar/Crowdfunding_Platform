
"use client" ;
import React, { useEffect } from "react";

import { message, Modal  , Spin} from "antd";
import { deleteCampaign, getCampaignReportById } from "@/actions/Campaign";
import DashboardCard from "@/components/dashboard-card";
import DonationTable from "@/components/donation-table";

interface Props {
    showCampaignReportModel: boolean;
    setShowCampaignReportModel: (show: boolean) => void;
    selectedCampaigns: CampaignType | null;
    
}

function CampaignReportsModel({showCampaignReportModel , setShowCampaignReportModel , selectedCampaigns}:Props) {
  const [data ,setdata]=React.useState<any>(null) ;
   const [loading , setloading] = React.useState<boolean>(false) ;
   const getData = async () =>{
    if (!selectedCampaigns?._id) return;
    try {
      setloading(true) ;
      const result = await getCampaignReportById(selectedCampaigns?._id)
      if(result.error) throw new Error(result.error) ;
      console.log(result.data)
      setdata(result.data)
    } catch (error:any) {
      message.error(error.message) ;
    }
    finally{
      setloading(false) ;
    }
   }

   useEffect(() => {
    if (selectedCampaigns?._id) {
      getData();
    }
  }, [selectedCampaigns?._id]);
  
  return (
    <Modal 
    open={showCampaignReportModel}
    onCancel={() => setShowCampaignReportModel(false)}
    title=""
    footer={null}
    width={1000}
  >
    {/* Modal content goes here */}
    <div className="flex flex-col">
      <span className="font-semibold text-gray-500 mb-2">Campaign</span>
      <span className="text-sm font-semibold text-gray-800">
      {selectedCampaigns?.name}
      </span>
      </div>
      <hr className="my-5" />
      <div className="flex justify-center">
      {loading &&  <Spin/>}
      </div>
      
      {data && (
        <div>
          <div className="grid grid-cols-3 gap-5">
            <DashboardCard cardTitle="total Donations" 
            description="total number of donations done by users for this campaign"
            value={data.donationCount} />
            <DashboardCard
            cardTitle="total Amount raised "
            description="total amount raised by this campaign through all donations till now"
            value={`₹ ${data.totalAmountRaised}`}
             />
          </div>

          <div className="mt-5">
            <h1 className="text-sm font-semibold  text-[#164863]">
                Donations
            </h1>
            <DonationTable 
            fromCampaign={true}
            donations={data.donations} fromAdmin={true } /> 
          </div>
        </div>
      )}
  </Modal>
  
  );
}
export default CampaignReportsModel;


// import React, { useEffect } from "react";
// import { message, Modal, Spin } from "antd";
// import { getCampaignReportById } from "@/actions/Campaign";
// import DashboardCard from "@/components/dashboard-card";
// import DonationTable from "@/components/donation-table";

// interface Props {
//   showCampaignReportModel: boolean;
//   setShowCampaignReportModel: (show: boolean) => void;
//   selectedCampaigns: CampaignType | null;
// }

// function CampaignReportsModel({
//   showCampaignReportModel,
//   setShowCampaignReportModel,
//   selectedCampaigns,
// }: Props) {
//   const [data, setData] = React.useState<any>(null);
//   const [loading, setLoading] = React.useState<boolean>(false);

//   const getData = async () => {
//     if (!selectedCampaigns?._id) return;
//     try {
//       setLoading(true);
//       const result = await getCampaignReportById(selectedCampaigns._id);
//       if (result.error) throw new Error(result.error);
//       setData(result.data);
//     } catch (error: any) {
//       message.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedCampaigns?._id) {
//       getData();
//     }
//   }, [selectedCampaigns?._id]);

//   return (
//     <Modal
//       open={showCampaignReportModel}
//       onCancel={() => setShowCampaignReportModel(false)}
//       title=""
//       footer={null}
//       width={1000}
//     >
//       <div className="flex flex-col">
//         <span className="font-semibold text-gray-500 mb-2">Campaign</span>
//         <span className="text-sm font-semibold text-gray-800">
//           {selectedCampaigns?.name}
//         </span>
//       </div>
//       <hr className="my-5" />
//       <div className="flex justify-center">
//         {loading && <Spin />}
//       </div>

//       {/* Render data only when it's available */}
//       {data && (
//         <div>
//           <div className="grid grid-cols-3">
//             <DashboardCard
//               cardTitle="Total Donations"
//               description="Total number of donations done by users for this campaign"
//               value={data.donations}
//             />
//             <DashboardCard
//               cardTitle="Total Amount Raised"
//               description="Total amount raised by this campaign through all donations till now"
//               value={`₹ ${data.totalAmountRaised}`}
//             />
//           </div>

//           <div className="mt-5">
//             <h1 className="text-sm font-semibold text-[#164863]">Donations</h1>
//             <DonationTable donations={data.donations} fromAdmin={true} />
//           </div>
//         </div>
//       )}
//     </Modal>
//   );
// }

// export default CampaignReportsModel;
