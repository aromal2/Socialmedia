import { ObjectId } from "mongoose";
import { adminHelper } from "../../framework/database/mongoDb/repositories/adminHelper";

  export const adminDbrepository=(repository:ReturnType<adminHelper>)=>{

    const getUserByEmail = async(Email:string)=>{
      return await repository.getUserByEmail(Email)
  }

  const getUserlist= async()=>{
    return await repository.getUserlist()
  }

  const blockusers= async(userId:string)=>{
    return await repository.blockuser(userId)
  }

  
  const unblockusers= async(userId:string)=>{
    return await repository.unblockuser(userId)
  }

  const genderdetails = async()=>{
    return await repository.genderdetail()
  }

  const agedetails = async()=>{
    return await repository.agedetail()
  }

  
  const totalpost=async()=>{
    return await repository.totalpost()
   }

   const reportpost=async()=>{
    return await repository.reportpost()
   }

    return {
getUserByEmail,
getUserlist,
blockusers,
unblockusers,
genderdetails,
agedetails,
totalpost,
reportpost

}
  }

  export type adminInterface=typeof  adminDbrepository