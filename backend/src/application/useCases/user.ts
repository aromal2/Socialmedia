import { UserDbinterface } from "../repositories/userDbrepository";
import { userHelper } from "../../framework/database/mongoDb/repositories/userHelper";

export const getAlluser =async (userDbrepository:ReturnType<UserDbinterface>)=>{


    
    const data = await userDbrepository.getAlluser()
    if(data)
    {
        return data
    }

}

export const followPosts = async (userId:string,auserId:string,userDbrepository:ReturnType<UserDbinterface>)=>{
const data = await userDbrepository.followPost(userId,auserId) 
if(data) return data

}

export const unfollowPosts =async (userId:string,auserId:string,userDbrepository:ReturnType<UserDbinterface>)=>{
    const data= await userDbrepository.unfollowPost(userId,auserId)
    if(data) return data
}