"use client";
import { title } from "process";
import React from "react";
import { Table ,Button ,message } from "antd";
import { renderToHTML } from "next/dist/server/render";
import { useRouter } from "next/navigation";
// import { set } from "mongoose";
import { deleteCampaign } from "@/actions/Campaign";

interface Props {
    campaigns: CampaignType[];
}

function CampaignsTable({campaigns}: Props) {
  const router = useRouter();
  const[loading,setloading] = React.useState(false);
  const  onDelete= async (id: string) => {
    try{
       setloading(true);
       const result= await deleteCampaign(id);
        if(result.error){
          throw new Error(result.error);
        }
        else{
          message.success(result.message);
          router.refresh();
        }
    }
    catch (error:any) {
      message.error(error.message);
    }
    finally{
      setloading(false);
    }
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render (name: string) {
        return <span>{name.toUpperCase()}</span>
      }
    },
    {
    title:'Organizer',
    dataIndex:'organizer',
    key:'organizer',
    },

    {
      title:'Category ' ,
      dataIndex:'Category',
      key:'Category',
      render (Category: string) {
        return <span>{Category.toUpperCase()}</span>
      }
    },
   
   {
     title: 'Target Amount',
     dataIndex: 'TargetAmount',
     key:'TargetAmount',
     render (TargetAmount: number) {
      return <span>₹ {TargetAmount}</span>
   } 
  },
   {
    title: 'Collect Amount',
    dataIndex: 'collectAmount',
    key:'collectAmount',
    render (collectAmount: number) {
     return <span>₹ {collectAmount}</span>
  } 
},
   {
      title: 'Start Date',
      dataIndex: 'StartDate' ,
      key:'StartDate' ,
    },
    {
      title: 'End Date',
      dataIndex: 'EndDate',
      key:'EndDate',
    },
    {
      title: 'Action',
  
      key:' action',
      render(record: CampaignType ) {
        return (
          <div className="flex gap-5 "> 
          <Button 
          onClick={() => router.push(`/admin/campaigns/edit-campaign/${record._id}`)}
          size="small" icon={<i className="ri-pencil-line"></i>} />
          <Button
           size="small"
            onClick={() => onDelete(record._id)}
            icon={<i className="ri-delete-bin-line"></i>} />
          </div>
        )
      }
    }
    
  ]
    return(
    <div>
  <Table dataSource={campaigns} columns={columns}
  loading={loading}

   />
    </div>
    )
}
export default CampaignsTable;