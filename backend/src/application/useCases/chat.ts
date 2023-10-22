import express from "express"
import { ChatDbinterface } from "../repositories/chatDbrepository"
import { chatHelper } from "../../framework/database/mongoDb/repositories/chatHelper"


export const accessChat=async(userId:string,chattinguserId:string,chatDbrepository:ReturnType<ChatDbinterface>)=>{
 const data=await chatDbrepository.accesschat(userId,chattinguserId)
 if(data) return data
}

export const userChat= async(userId:string,chatDbrepository:ReturnType<ChatDbinterface>)=>{
     const data=await chatDbrepository.userchat(userId)
}

export const findChats= async(firstId:string,secondId:string,chatDbrepository:ReturnType<ChatDbinterface>)=>{
    const data=await chatDbrepository.findchat(firstId,secondId)
}

