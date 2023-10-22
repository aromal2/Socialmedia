import { UserDbinterface } from "../repositories/userDbrepository";
import { userHelper } from "../../framework/database/mongoDb/repositories/userHelper";
import { ObjectId } from "mongoose";

export const getAlluser =async (userDbrepository:ReturnType<UserDbinterface>)=>{


    
    const data = await userDbrepository.getAlluser()
    if(data)
    {
        return data
    }

}

export const getAllpost = async (userId:string,userDbrepository: ReturnType<UserDbinterface>) => {
  console.log(userId,"tttttttttttt");
  
    const data = await userDbrepository.getAllpost(userId);
    if (data) {
      return data;
    }
  };




export const followPosts = async (userId:ObjectId,auserId:ObjectId,userDbrepository:ReturnType<UserDbinterface>)=>{
const data = await userDbrepository.followPost(userId,auserId) 
console.log(data,"8usecase");

if(data) return data

}

export const unfollowPosts =async (userId:ObjectId,auserId:ObjectId,userDbrepository:ReturnType<UserDbinterface>)=>{
    console.log(userId,auserId,"===========usecase========");
    
    const data= await userDbrepository.unfollowPost(userId,auserId)
    console.log(data,"datausecas9e");
    
    if(data) return data
// }
}
export const getOneuser= async (userId:string,userDbrepository:ReturnType<UserDbinterface>)=>{
    const data=await userDbrepository.getOneUser(userId)
     if(data) return data
}

export const savedpost = async (userId:string,postId:ObjectId,userDbrepository:ReturnType<UserDbinterface>)=>{
    const data= await userDbrepository.savedPost(userId,postId)
      if (data) return data
}

export const unsavedpost = async (userId:string,postId:ObjectId,userDbrepository:ReturnType<UserDbinterface>)=>{
  const data= await userDbrepository.unsavedPost(userId,postId)
   if(data) return data
}

export const getSavedpost = async (userId:string,userDbrepository:ReturnType<UserDbinterface>)=>{
    const data =await userDbrepository.getSavedpost(userId)
    if(data) return data
}

export const editProfiles=async(userid:string,bio:string,gender:string,profilePic:string,userDbrepository:ReturnType<UserDbinterface>)=>{
  const data= await userDbrepository.editProfile(userid,bio,gender,profilePic)
  if(data) return data
  
}

export const followerDetail=async(userId:string,userDbrepository:ReturnType<UserDbinterface>)=>{

  
  const data= await userDbrepository.followersDetails(userId)

  
   if(data) return data
}

export const followingDetail=async(userId:string,userDbrepository:ReturnType<UserDbinterface>)=>{
  const data= await userDbrepository.followingDetails(userId)
   if(data) return data
}

export const searchUser=async(searchQuery:string,userDbrepository:ReturnType<UserDbinterface>)=>{
  const data= await userDbrepository.search(searchQuery)
  if(data) return data
}

export const profilePosts=async(userId:string,userDbrepository:ReturnType<UserDbinterface>)=>{
  console.log(userId,"kkkkkkkkkkllllllllllllyyyyyyyyyyyyyyyyyyyyy");
  
  const data=await userDbrepository.profilePost(userId)
  if(data) return data
}

export const verifications=async(
  
    email:string,
    brand:string,
    price:number,
  
 
  userDbrepository:ReturnType<UserDbinterface>)=>{

   const verifyprofile={email,
    brand,
    price
   }
   console.log(verifyprofile,"888888888888");
   

  const data = await userDbrepository.profileverification(verifyprofile)
  if(data) return data
}

export const profileverify=async(email:string,userDbrepository:ReturnType<UserDbinterface>)=>{
  const data=await userDbrepository.verifying(email)
   if(data) return data
}



