import baseURL from "../api";

export const addMessage=async(chatterId,userId,secondId,message)=>{
try{
 const response=await baseURL.post('message',{chatterId,userId,secondId,message})
 return response.data
}catch(error)
{
    console.log(error);
}
}

export const getChatlists=async(userId)=>{
    try{
        console.log(userId,"userIdconnection");
   const response=await baseURL.post('message/getallchats',{userId})
   return response.data
    }catch(error)
    {
        console.log(error);
    }
}