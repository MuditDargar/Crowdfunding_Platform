"use client";
import React from 'react'
import {Button} from 'antd'
import { useRouter } from 'next/navigation';

interface LinkButtonprops {
    title: string ;
     path:string;
     type?: "primary" | "default";
}

function LinkButton({title , path , type='default'}:LinkButtonprops) {
    const router =useRouter() ;
  return (
  <Button type={type}
  onClick={()=>{
        router.push(path);
  }}
  className='bg-[#164863] text-white hover:bg-[#164863] hover:text-white transition duration-300 ease-in-out w-max'
  >
    {title}
  </Button>
  )
}

export default LinkButton
