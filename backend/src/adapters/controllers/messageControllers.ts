import { Request, Response } from 'express';
import asyncHandler from "express-async-handler";
import { MessageDbinterface } from '../../application/repositories/messageDbrepository';
import { messageHelper } from '../../framework/database/mongoDb/repositories/messageHelper';
import { addmessage,getChatlist,getmessage } from "../../application/useCases/message";
import stripe from "stripe"

const messageControllers = (
    messageInterface: MessageDbinterface,
    messageHelper: messageHelper
) => {
    const messageMain = messageInterface(messageHelper());

    const addMessage = asyncHandler(async (req: Request, res: Response) => {
        try {
        
            
            const addMessageResponse = await addmessage(req.body.chatterId,req.body.userId, req.body.secondId, req.body.message, messageMain);
            res.json(addMessageResponse);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' }); 
        }
    });

    // const getMessage = asyncHandler(async (req: Request, res: Response) => {
    //     const addMessageresponse = await addmessage();
    // });

    const getChatlists=asyncHandler(async(req:Request,res:Response)=>{
        try{
            console.log(req.body,"33333333333");
            
            const getAllChatsresponse=await getChatlist(req.body.userId,messageMain)
            res.json(getAllChatsresponse)

        }catch (error)
        {
            console.log(error);
            
        }
    })

    const getMessage=asyncHandler(async(req:Request,res:Response)=>{
        try{
            const getMessageresponse=await getmessage(req.body.chatId,messageMain)

        }catch (error)
        {


            console.log(error);
            
        }
    })

    const payment=asyncHandler(async(req:Request,res:Response)=>{
        try{
          const{product,token}=req.body

      


        }catch(error)
        {
            console.log(error);
            
        }
    })

    return {
        addMessage,
        getChatlists,
        getMessage,
        payment
    };
}

export default messageControllers;
