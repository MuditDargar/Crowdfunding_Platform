"use client"
import React from 'react';
import CampaignCard from './campaign-card';
import dayjs from 'dayjs';
import { Table } from 'antd';
interface DonationTableProps {
    // Define any props you need here
    donations : DonationType[] ;
    fromAdmin : boolean ;

}

function DonationTable ({donations, fromAdmin} : DonationTableProps) {
   
    let columns : any [] = [
        {
           title : "Campaign" ,
              dataIndex : "campaign" ,
              key: "campaign" ,
              render  :(campaign : CampaignType) => {
                return (
                    <span>{campaign.name}</span>
                )
              }
        },
        {
            title : "Amount" ,
            dataIndex : "amount" ,
            key: "amount" ,
            render  :(amount : number) => {
                return (
                    <span> ₹ {amount}</span>
                )
            }
        },
        {
    title :"Message" ,
    dataIndex :"message" ,
    key :"message" ,
        },
        {
            title : "Date  & time" ,
            dataIndex : "createdAt" ,
            key: "createdAt" ,
            render  :(createdAt : Date) => {
                return (
                    <span>
                       {dayjs(createdAt).format('MMM DD, YYYY hh:mm A')}
                    </span>
                )
            }
        },
      
    ] ;

    if(fromAdmin){
        // add user column after campaign column
        columns.splice(1, 0, {
            title : "User" ,
            dataIndex : "user" ,
            key: "user" ,
            render  :(user : UserType) => {
                return (
                    <span>{user.userName}</span>
                )
            }
        })
    }
    
    return (
        <div> 
<Table dataSource={donations} columns={columns} />
     </div>
    )

}
export default DonationTable ;