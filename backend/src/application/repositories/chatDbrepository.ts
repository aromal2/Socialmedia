import { chatHelper } from "../../framework/database/mongoDb/repositories/chatHelper";

export const chatDbrepository=(repository:ReturnType<chatHelper>)=>{

    const accesschat=async(userId:string,chattinguserId:string)=>{
        return await repository.createChat(userId,chattinguserId)
    }

    const userchat=async(userId:string)=>{
        return await repository.userChat(userId)
    }

    const findchat=async(firstId:string,secondId:string)=>{
        return await repository.findChat(firstId,secondId)
    }
    
 return {
accesschat,
userchat,
findchat
    }
}

export type ChatDbinterface = typeof chatDbrepository
