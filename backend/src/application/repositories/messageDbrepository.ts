import  {messageHelper} from "../../framework/database/mongoDb/repositories/messageHelper"

export const messageDbrepository=(repository:ReturnType<typeof messageHelper>)=>{

    const addmessage=async(chatterId:string,userId:string,secondId:string,message:string)=>{
        return await repository.addMessages(chatterId,userId,secondId,message)
    }

    const getChatlist=async(userId:string)=>{
      return await repository.getChatlist(userId)
    }

    



    const getMessage=async(chatId:string)=>{
      return await repository.getMessage(chatId)
    }
    return {
  addmessage,
  getChatlist,
  getMessage
    }
}

export type MessageDbinterface = typeof messageDbrepository