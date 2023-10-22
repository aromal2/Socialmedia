import express from 'express'
import { MessageDbinterface } from "../repositories/messageDbrepository";

export const addmessage=async(chatterId:string,userId:string,secondId:string,message:string,messageDbrepository:ReturnType<MessageDbinterface>)=>{

const data = await messageDbrepository.addmessage(chatterId,userId,secondId,message)
if(data) return data
}

export const getChatlist=async(userId:string,messageDbrepository:ReturnType<MessageDbinterface>)=>{
       console.log(userId,"authhmessage");
       
    const data = await messageDbrepository.getChatlist(userId)
    if(data) return data
    }


    export const getmessage=async(chatId:string,messageDbrepository:ReturnType<MessageDbinterface>)=>{

        const data = await messageDbrepository.getMessage(chatId)
        }