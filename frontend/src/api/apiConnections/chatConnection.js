import baseURL from "../api";

export const createChats = async(userId,chattinguserId)=>{
    try {
        console.log(userId,chattinguserId,"6666666666666666666");
     const response=await baseURL.post('chat',{userId,chattinguserId})
     console.log(response,"9999999999999922222222111111111");
     return response.data
    }catch (error)
    {
        console.log(error);
    }
}