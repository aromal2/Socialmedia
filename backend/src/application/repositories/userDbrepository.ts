import { ObjectId } from "mongoose";
import { userHelper } from "../../framework/database/mongoDb/repositories/userHelper";

export const userDbrepository = (repository:ReturnType<userHelper>)=>{
    const addUser = async(user:{
        firstName:string,
        lastName:string,
        userName:string,
        email:string,
        password:string,
        age:Number,
        gender:string
    })=>{
        const addingUser =await repository.addUser(user)
        addingUser.password =""
        return addingUser
    }

    const getUserByEmail = async(email:string)=>{
        console.log(email,"emaillllll");
        
        return await repository.getUserByEmail(email)
    }

    const getUserByUsername = async(userName:string)=>{
        return await repository.getUserByUserName(userName)
    }

    const getUserByMobile = async(mobile:string)=>{
        return await repository.getUserByMobile(mobile)
    }

    const getUser = async(email:string)=>{
        return await repository.getUserByNameMailMobile(email)
    }

    const getAlluser = async ()=>{
        return await repository.getAlluser()
    }

    const getAllpost =async(userId:string)=>{
        console.log(userId,"5555555533333333333");
        
        return await repository.getAllposts(userId)
    }


    const followPost = async (userId:ObjectId,auserId:ObjectId)=>{
        return await repository.followPost(userId,auserId)
    }

    const unfollowPost=async (userId:ObjectId,auserId:ObjectId)=>{
        return await repository.unfollowPost(userId,auserId)
    }

    const getOneUser=async(userId:string)=>{
        return await repository.getOneuser(userId)
    }

    const savedPost =async(userId:string,postId:ObjectId)=>{
        console.log(userId,postId,"-----------repo");
        
        return await repository.savedPost(userId,postId)
    }

    const unsavedPost = async(userId:string,postId:ObjectId)=>{
        return await repository.unsavedPost(userId,postId)
    }

    const getSavedpost=async(userId:string)=>{
        return await repository.getSavedpost(userId)
    }

    const editProfile=async(userid:string,bio:string,gender:string,profilePic:string)=>{
        return await repository.editProfile(userid,bio,gender,profilePic)
    }

    const followersDetails= async(userId:string)=>{
        return await repository.followerDetails(userId)

    }

    const followingDetails= async(userId:string)=>{
        return await repository.followingDetails(userId)

    }

    const search= async(searchQuery:string)=>{
        return await repository.searchUser(searchQuery)
    }

    const profilePost=async(userId:string)=>{
        return await repository.profilePost(userId)
    }

    // const emailchecking =async(email:string)=>{
    //     return await repository.emailchecking(email)
    // }

    const googleaddUser = async(user:{
        userName:string,
        email:string,
    }
       
    )=>{
        const addingUser =await repository.googleaddUser(user)
        return addingUser
    }

    const profileverification=async(verifyprofile:{
        email:string,
        brand:string,
        price:number

    })=>{
        const verifyprofiles=await repository.verifications(verifyprofile)
        return verifyprofiles
    }

    const verifying=async(email:string)=>{
        const verifyresponse=await repository.verify(email)
        return verifyresponse
    }

    return {
        addUser,
        getUserByEmail,
        getUserByUsername,
        getUserByMobile,
        getUser,
        getAlluser,
        getAllpost,
        followPost,
        unfollowPost,
        getOneUser,
        savedPost,
        getSavedpost,
        editProfile,
        unsavedPost,
        followersDetails,
        followingDetails,
        search,
        profilePost,
        googleaddUser,
        profileverification,
        verifying
        
    }
}

export type UserDbinterface =typeof userDbrepository