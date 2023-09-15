import { userHelper } from "../../framework/database/mongoDb/repositories/userHelper";

export const userDbrepository = (repository:ReturnType<userHelper>)=>{
    const addUser = async(user:{
        firstName:string,
        lastName:string,
        userName:string,
        email:string,
        password:string
    })=>{
        const addingUser =await repository.addUser(user)
        addingUser.password =""
        return addingUser
    }

    const getUserByEmail = async(email:string)=>{
        return await repository.getUserByEmail(email)
    }

    const getUserByUsername = async(userName:string)=>{
        return await repository.getUserByUserName(userName)
    }

    const getUserByMobile = async(mobile:string)=>{
        return await repository.getUserByMobile(mobile)
    }

    const getUser = async(userData:string)=>{
        return await repository.getUserByNameMailMobile(userData)
    }

    const getAlluser = async ()=>{
        return await repository.getAlluser()
    }

    const followPost = async (userId:string,auserId:string)=>{
        return await repository.followPost(userId,auserId)
    }

    const unfollowPost=async (userId:string,auserId:string)=>{
        return await repository.unfollowPost(userId,auserId)
    }
    return {
        addUser,
        getUserByEmail,
        getUserByUsername,
        getUserByMobile,
        getUser,
        getAlluser,
        followPost,
        unfollowPost
    }
}

export type UserDbinterface =typeof userDbrepository