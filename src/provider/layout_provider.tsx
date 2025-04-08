"use client";
import { UserButton } from '@clerk/nextjs';
import { useEffect ,useState } from 'react';
import { Button, Dropdown, message } from 'antd';
import React from 'react';
import { getCurrentUserDataFromMongoDb } from '@/actions/users';

import { usePathname, useRouter } from "next/navigation";


function layout_provider({children}:{children:React.ReactNode}) {
  const [currentUser , setcurrentUser] = useState<any>(null);
  const [menuToShow , setmenuToShow] = useState<any>([]);
  const pathname =usePathname() ;
 const  router=useRouter();
const userMenu =[
  {
    name :"Dashboard",
    url:"/dashboard"
  },
  {
    name :"Donations",
    url:"/donations"
  }
]
const adminMenu =[
  {
    name :"Dashboard",
    url:"/admin/dashboard"
  },
  {
    name :"Donations",
    url:"/admin/donations"
  },
 
  {
    name :"Campaigns",
    url:"/admin/campaigns"
  },
  {
    name:"Users",
    url:"/admin/users"
  }
]

  const getCurrentUser = async ()=>{
    try {
      const response = await getCurrentUserDataFromMongoDb();
      if(response.error) throw new Error(response.error);
      setcurrentUser(response.data);
      console.log("Current User",response.data);
      
      if(response.data.isadmin){
        setmenuToShow(adminMenu);
      }
      else{
        setmenuToShow(userMenu);
      }
    } catch (error:any) {
      message.error(error.message);
    }
  }

  const getHeader =() =>{


    //  if the route is sign-in orr sign-up don't show header
    if(pathname.includes('/sign-in') || pathname.includes('/sign-up')) return null ;

    return (
      <div className='p-5 bg-[#164863] flex justify-between items-center'>
      <h1 className='font-weight:bold text-white text-4xl cursor-pointer'
      onClick={()=>router.push('/')}
      >
         Raise IT
      </h1>
         <div className='bg-white rounded py-2 px-4  gap-3 flex items-center'>
          <Dropdown
          menu={{ items: menuToShow.map((menu:any)=>({
            key:menu.name,
            label:menu.name,
            onClick:()=>router.push(menu.url)
          }))}} 
          >
    
        {/* <h1 className='font-weight:bold text-black text-md '> {currentUser?.username}</h1> */}
         <Button type='link' className=' text-[#164863] ' >
         {currentUser?.username}
         </Button>
          </Dropdown>
          <UserButton 
          afterSignOutUrl="/sign-in"
          
           />
         </div>
        </div>
    )

  } 
  const getContent = () =>{
  return (
    <div className='p-3'>
      {children}
    </div>
  )
  }

  useEffect(()=>{
    getCurrentUser();
  },[]) 
console.log(currentUser);
  return ( 
    <div>
 {getHeader()}
  {getContent()}
    </div>
  )
}

export default layout_provider
