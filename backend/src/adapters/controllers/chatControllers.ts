import { Request,Response } from "express"
import asynchandler from "express-async-handler"

import { chatHelper } from "../../framework/database/mongoDb/repositories/chatHelper"
import { ChatDbinterface } from "../../application/repositories/chatDbrepository"
import { accessChat,userChat,findChats} from "../../application/useCases/chat"

const chatControllers = (
    chatInterface:ChatDbinterface,
    chatHelper:chatHelper
) => {

  const chatMain=chatInterface(chatHelper())
  
const accesschat=asynchandler(async(req:Request,res:Response)=>{
  console.log(req.body,"888888888888");
  
const accesschatresponse= await accessChat(req.body.userId,req.body.chattinguserId,chatMain)
console.log(accesschatresponse,"99999999999999999");
res.json(accesschatresponse)
})

const userChats=asynchandler(async(req:Request,res:Response)=>{
  const userchatsresponse=await userChat(req.params.userId,chatMain)
})

const findChat=asynchandler(async(req:Request,res:Response)=>{
  const findchatsresponse=await findChats(req.params.firstId,req.params.secondId,chatMain)
})



return {
accesschat,
userChats,
findChat,
}
    
  
}

export default chatControllers