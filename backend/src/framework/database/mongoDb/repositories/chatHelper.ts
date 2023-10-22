import {ObjectId} from "mongoose"
import Chat from "../models/chatModel"
import User from "../models/userModel"
import mongoose from "mongoose"
import Message from "../models/messageModel"

export const chatHelper =()=>{

   const createChat=async(userId:string,chattinguserId:string)=>{
      try {
           const userID = new mongoose.Types.ObjectId(userId)
           const chattinguserID = new mongoose.Types.ObjectId(chattinguserId)
           const chatExists = await Chat.find(
            {members:{$all:[userID,chattinguserID]}}
        )

        console.log(chatExists,"chatexists");
        

        if(chatExists.length)
        {

         const messages = await Message.aggregate([
            {
              '$match': {
                'chatId':new mongoose.Types.ObjectId(chatExists[0]._id)
              }
            }, {
              '$sort': {
                'createdAt': 1
              }
            }, {
              '$project': {
                'message': 1,
                'createdAt': 1,
                'userId':1
              }
            }
          ]);

          console.log(messages,"7777777");
          
          
         return {chatId:chatExists[0]._id,messages}

        } else {
         const newChat=new Chat({
             members:[userID,chattinguserID]
         })
          const chatId= await newChat.save() 
          
          return {chatId,messages:[]}
        }
      }catch(error)
      {
         console.log(error);
         
      }
   }



    const userChat=async(userId:string)=>{
    try{
     const chat=await Chat.find({
        members:{$in:[userId]}
     })
     return chat
    }catch(error)
    {
        console.log(error);
        
    }
   } 

    const findChat=async(firstId:string,secondId:string)=>{
      try{

         const chat= await Chat.findOne({
            members:{$all:[firstId,secondId]}
         })
           return chat
      }
      catch(error)
      {
         console.log(error)
      }
    
   }



   return {
      createChat,
      userChat,
      findChat
   }
}

export type chatHelper =typeof chatHelper