import {adminInterface} from "../repositories/adminDbrepository"

export const getuserlist=async(adminrepository:ReturnType<adminInterface>)=>{

    const data = await adminrepository.getUserlist()
    if(data)
    {
        return data
    }
}

export const blockusers=async(userId:string,adminrepository:ReturnType<adminInterface>)=>{

    const data = await adminrepository.blockusers(userId)
    if(data)
    {
        return data
    }
}


export const unblockusers=async(userId:string,adminrepository:ReturnType<adminInterface>)=>{

    const data = await adminrepository.unblockusers(userId)
    if(data)
    {
        return data
    }
}

export const genderdetail=async(adminrepository:ReturnType<adminInterface>)=>{

    const data = await adminrepository.genderdetails()
    if(data)
    {
        return data
    }
}

export const agedetail=async(adminrepository:ReturnType<adminInterface>)=>{

    const data = await adminrepository.agedetails()
    if(data)
    {
        return data
    }

}

export const totalposts=async(adminrepository:ReturnType<adminInterface>)=>{
    const data=await adminrepository.totalpost()
    if(data)
    {
        return data
    }
   }

export const reportposts = async(adminrepository:ReturnType<adminInterface>)=>{
    const data=await adminrepository.reportpost()
    if(data)
    {
        return data
    }
}




