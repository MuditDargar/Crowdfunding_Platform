"use server";

import { connectDB } from "@/db/config";
import { currentUser } from "@clerk/nextjs/server";
import UserModel from "@/models/usermodels" ;
connectDB();


export const handleNewUserRegistration = async ()=>{
    // handle new user registration
    try{
      const loggedInUserData = await currentUser();
   // check if the user model already exists , if its exits return user data 
    const existingUser = await UserModel.findOne({clerkuserid: loggedInUserData?.id}); 
    if(existingUser){
        return existingUser ;
    }

    //  Create  new user 
     let username = loggedInUserData?.username ;
     if(!username){
         username=loggedInUserData?.firstName + " " + loggedInUserData?.lastName ;
         username = username?.replace("null","") ;
     }
     const newUser=new UserModel({
        clerkuserid: loggedInUserData?.id,
        username: username,
        email: loggedInUserData?.emailAddresses[0].emailAddress,
        profilepic: loggedInUserData?.imageUrl,
      
     })
     await newUser.save();
     return newUser ;
     
    } 
    catch(error:any){
        return {
            error: error.message
        };
    }
};

export const getCurrentUserDataFromMongoDb = async ()=>{
   try {
     const loggedInUserData = await currentUser();
        const mongoUser= await UserModel.findOne({ clerkuserid : loggedInUserData?.id});
        return{
            data:JSON.parse(JSON.stringify(mongoUser))
        }
   } catch (error:any) {
      return {
        error:error.message
      }
   }
}