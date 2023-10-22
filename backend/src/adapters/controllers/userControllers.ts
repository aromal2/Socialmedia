import { Request,Response} from "express";
import asyncHandler from "express-async-handler";

import { userHelper } from "../../framework/database/mongoDb/repositories/userHelper";
import { UserDbinterface } from "../../application/repositories/userDbrepository";
import {getAlluser,getAllpost,followPosts,unfollowPosts,getOneuser,savedpost, unsavedpost,getSavedpost,editProfiles,followerDetail,followingDetail,searchUser,profilePosts,verifications,profileverify} from "../../application/useCases/user"

const userControllers=(
    userInterface:UserDbinterface,
    userHelper:userHelper
)=>{
    const userMain=userInterface(userHelper())

    const getUser = asyncHandler(async (req:Request,res:Response)=>{
        const userresponse=await getAlluser(userMain)
        res.json(userresponse)
    })
    

    const getPost = asyncHandler(async (req: Request, res: Response) => {
        
        const response = await getAllpost(req.body.userId,userMain);
        res.json(response);
      });

    const followPost =asyncHandler(async (req:Request,res:Response)=>{

        const followresponse=await followPosts(req.body.userId,req.body.auserId, userMain)
        res.json(followresponse)
        
    })

    const unfollowPost = asyncHandler(async(req:Request,res:Response)=>{
        const unfollowresponse= await unfollowPosts(req.body.userId,req.body.auserId,userMain)
        res.json(unfollowresponse)
    })

    const getsingleuserDetails=asyncHandler(async(req:Request,res:Response)=>{
        const getoneuserresponse = await getOneuser(req.params.userId,userMain)
        res.json(getoneuserresponse)
    })

    const savedPost=asyncHandler(async(req:Request,res:Response)=>{
    const savedpostresponse=await savedpost(req.body.userId,req.body.postId, userMain)
     res.json(savedpostresponse)
    })

    const unsavedPost=asyncHandler(async(req:Request,res:Response)=>{
        const unsavedresponse= await unsavedpost(req.body.userId,req.body.postId,userMain)
        res.json(unsavedresponse)
    })

    const getsavedPost=asyncHandler(async(req:Request,res:Response)=>{
        const getSavedpostresponse =await getSavedpost(req.params.userId,userMain) 
        res.json(getSavedpostresponse)
    })


    const editProfile=asyncHandler(async(req:Request,res:Response)=>{
    const cloudinaryProfile=req?.file?.path?.split("/edit-")[1] as string;  
    console.log(req.body,cloudinaryProfile,"111111reqbody");
      
    const editprofileResponse=await editProfiles(req.body.userid,req.body.bio,req.body.gender,cloudinaryProfile,userMain)
    res.json(editprofileResponse)

    })


    const followersDetails=asyncHandler(async(req:Request,res:Response)=>{
        const followersdetailsResponse= await followerDetail(req.params.userId,userMain)
         res.json(followersdetailsResponse)
    })

    const followingsDetails=asyncHandler(async(req:Request,res:Response)=>{
        const followingdetailsResponse= await followingDetail(req.params.userId,userMain)
         res.json(followingdetailsResponse)
    }) 

    const search=asyncHandler(async(req:Request,res:Response)=>{
    const searchuserResponse =await searchUser(req.body.searchQuery,userMain) 
         res.json(searchuserResponse)
    })

    const profilePost=asyncHandler(async(req:Request,res:Response)=>{
        
        const profilepostRespponse= await profilePosts(req.params.userId,userMain)
        res.json(profilepostRespponse)
    })

    const verification=asyncHandler(async(req:Request,res:Response)=>{
        console.log(req.body,"mmmmmmmmmmmmmmmmmmuuuuu");
        if(req.body)
        {
             const verificationResponse=  verifications(req.body.token.email,req.body.token.card.brand,req.body.product.price,userMain)
           
             res.json(verificationResponse)
        }
        // Stripe.customers.create({
        //     email:'aro@gmail.com'
        // })

        // console.log(customers);
        
        
       
        //const verificationresponse=await 
    })

    const verify=asyncHandler(async(req:Request,res:Response)=>{
        const verifyresponse=await profileverify(req.body.email,userMain)
        res.json(verifyresponse)
    })

    

    return {
        getUser,
        getPost,
        followPost,
        unfollowPost,
        getsingleuserDetails,
        savedPost,
        unsavedPost,
        getsavedPost,
        editProfile,
        followersDetails,
        followingsDetails,
        search,
        profilePost,
        verification,
        verify
        
        
    }
}

export default userControllers

