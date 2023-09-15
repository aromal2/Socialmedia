import { Request,Response,request,response } from "express";
import asyncHandler from "express-async-handler";

import { userHelper } from "../../framework/database/mongoDb/repositories/userHelper";
import { UserDbinterface } from "../../application/repositories/userDbrepository";
import {getAlluser,followPosts,unfollowPosts} from "../../application/useCases/user"
const userControllers=(
    userInterface:UserDbinterface,
    userHelper:userHelper
)=>{
    const userMain=userInterface(userHelper())

    const getUser = asyncHandler(async (req:Request,res:Response)=>{
        const userresponse=await getAlluser(userMain)
        console.log(userresponse,"cccontroller,,,,,");
        
        res.json(userresponse)
    })

    const followPost =asyncHandler(async (req:Request,res:Response)=>{

        const followresponse=await followPosts(req.body.userId,req.body.auserId, userMain)
        console.log(followresponse,"8888888888888888888");
        
        res.json(followresponse)
        
    })

    const unfollowPost = asyncHandler(async(req:Request,res:Response)=>{
        const unfollowresponse= await unfollowPosts(req.body.userId,req.body.auserid,userMain)
        res.json(unfollowresponse)
    })

    return {
        getUser,
        followPost,
        unfollowPost
    }
}

export default userControllers

