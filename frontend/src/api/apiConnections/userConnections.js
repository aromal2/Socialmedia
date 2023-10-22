
import baseURL from "../api";

export const listUser = async()=>{
    try {
const response= await baseURL.get("/user/getuser")
        return response.data
    } catch (error)
    {
console.log(error,"listuser");
    }
}

export const getPosts = async (userId) => {
  console.log(userId,"555555getttttposts");
    try{
      const response = await baseURL.post(`user/getallpost`,{userId});
      console.log(response,"jjjjjjjjjjjj");
      return response.data;
    } catch (error) {
      console.log(error, "errror in getAllpost");
    }
  };




export const followPost=async(userId,auserId)=>{
    try{

const response=await baseURL.post("/user/followuser",{userId,auserId})
console.log(response,"0000000000follow");
return response
    }catch(error)
    {
console.log(error,"follow");
    }
}

export const unfollowPost=async(userId,auserId)=>{
    try{
        
const response=await baseURL.post("/user/unfollowuser",{userId,auserId})
console.log(response,"222299999999unfollow");
return response
    }catch(error)
    {
        console.log(error,"unfollow")
    }
}

export const singleUserdetails = async (userId)=>{
    try{
    const response=await baseURL.get(`/user/singleuserdetails/${userId}`)
    return response.data
    }catch(error)
    {
  
    }
  }

  export const saved =async (userId,postId)=>{
    try {
const response=await baseURL.post(`/user/savedpost`,{userId,postId})
return response.data
    }catch (error)
    {
        console.log(error);
    }
  }

  export const unsaved= async (userId,postId)=>{
    try{
const response =  await baseURL.post(`/user/unsaved`,{userId,postId})
return response.data
    }catch (error)
    {
console.log(error,"unsavederror");
    }
  }

  export const getsavedPost=async(userId)=>{
    try{
     const response=await baseURL.get(`/user/getsavedpost/${userId}`)
     return response.data
    }catch(error)
    {
        console.log(error);
    }
  }

  export const editProfile=async(userId,bio,gender,editedFile)=>{
    console.log(userId,bio,gender,editedFile,"777777777777");
    try {
        const formData = new FormData()
        formData.append("userid",userId);
        formData.append("bio",bio);
        formData.append("gender",gender);
        formData.append("editedfile",editedFile)
const response=await baseURL.post(`/user/editprofile`,formData,{
    headers:{"Content-Type":"multipart/form-data"}
})

  return response.data
    } catch(error)
    {
        console.log(error);
    }
  }

  export const followers= async(userId)=>{
    try{
      console.log(userId,"22222222222222222");
        const response= await baseURL.get(`/user/followersdetails/${userId}`)
        return response.data
    }catch(error)
    {
console.log(error);
    }
  }

  export const followingDetails= async(userId)=>{
    try{
        const response= await baseURL.get(`/user/followingdetails/${userId}`)
        return response.data
    }catch(error)
    {
console.log(error);
    }
  }

  export const search= async(searchQuery)=>{
    try{
    ;
        const response=await baseURL.post(`/user/search`,{searchQuery})

        return response.data
    }catch(error)
    {
        console.log(error,"search");
    }
  }

  export const profilePost= async(userId)=>{
    try{
const reponse= await baseURL.get(`/user/profilepost/${userId}`)
return reponse.data
    }catch(error)
    {
        console.log(error);
    }
  }

  export const emailchecking = async(email)=>{
    console.log(email,"22224444111111userconnectionnnnn");
    try{
     const response=await baseURL.get(`/user/emailchecking/${email}`)
     console.log(response.data,"007");
     return response.data
    }catch(error)
    {
        console.log(error);
    }
  }

  export const handleverification = async(token,product)=>{
    try{
      console.log(token,"00000000000000000000");
   const response=await baseURL.post(`/user/verification`,{token,product})
   return response
    }catch(error)
    {
      console.log(error);
    }
  }

  export const verify=async(email)=>{
    try{
      console.log(email,"22222222222222email");
const response=await baseURL.post(`/user/verify`,{email})
return response.data
    }catch(error)
    {
      console.log(error);
    }
  }
 


