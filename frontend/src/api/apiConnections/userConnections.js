import baseURL from "../api";

export const listUser = async()=>{
    try {
const response= await baseURL.get("/user/getuser")
        return response.data
    } catch (error)
    {
console.log(error,"8888888888888");
    }
}


export const followPost=async(userId,auserId)=>{
    try{
        console.log(userId,auserId);
const response=await baseURL.post("/user/followuser",{userId,auserId})
return response
    }catch(error)
    {
console.log(error,"222222222222222");
    }
}

export const unfollowPost=async(userId,auserId)=>{
    try{
const response=await baseURL.post("/user/unfollowuser",{userId,auserId})
return response
    }catch(error)
    {
        console.log(error,"233333333333333333333333333");
    }
}