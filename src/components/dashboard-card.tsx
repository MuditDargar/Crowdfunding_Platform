"use client"
import React from "react";
import {useRouter

} from "next/navigation";

interface DashboardCardProps {
    cardTitle: string;
    description: string;
    value : string;
    onClickPath?: () => void;
}


async function DashboardCard({cardTitle, description, value  , onClickPath}: DashboardCardProps) {
    const Router = useRouter();
    return(
        <div className="flex flex-col gap-5 p-5 border border-solid rounded border-gray-200 hover:border-gray-700 bg-white shadow-md cursor-pointer  transition-all duration-300 ease-in-out"
        onClick={()=>{
            if(onClickPath){
                Router.push(onClickPath);
            }
        }}
        >
            <span className="text-[#164863] font-semibold">
                {cardTitle}
            </span>
            <span className="text-xs  text-gray-400 font-semibold">
             {description}
            </span>
            <span className="text-6xl font-semibold text-gray-700 text-center  ">
                {value}
            </span>
        </div>
    )

}
export default DashboardCard; 