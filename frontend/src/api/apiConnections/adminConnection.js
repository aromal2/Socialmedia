import baseURL from "../api";

export const userlist = async()=>{
    try {
    const response=await baseURL.get('admin/userlist')
    console.log(response,"ooooooooooooopppppllll");
    return response.data
    
    }catch (error)
    {
        console.log(error,"22222222222222222222222");
    }
}

export const block=async(userId)=>{
    try{
const response=await baseURL.get(`admin/block/${userId}`)
return response
    }catch(error)
    {
        console.log(error);
    }
}


export const unblock=async(userId)=>{
    try{
        const response=await baseURL.get(`admin/unblock/${userId}`)
        return response
    }catch(error)
    {
        console.log(error);
    }
}

export const genderdetails=async()=>{
    try {
     const response=await baseURL.get(`admin/genderdetails`)
     return response.data
    }catch(error)
    {
        console.log(error);
    }
}

export const agedetails=async()=>{
    try{
     const response=await baseURL.get(`admin/agedetails`)
     return response.data
    }catch(error)
    {
        console.log(error);
    }
}

export const totalpost=async()=>{
    try{
        const response=await baseURL.get(`admin/totalpost`)
        return response.data

    }catch(error)
    {
        console.log(error);
    }
}

export const reportpost=async()=>{
    try{
        const response=await baseURL.get(`admin/reportpost`)
        return response.data

    }catch(error)
    {
        console.log(error);
    }
}