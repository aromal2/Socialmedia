import {Request,Response} from "express"
import asyncHandler from "express-async-handler";

import { adminInterface } from "../../application/repositories/adminDbrepository"
import { adminHelper } from "../../framework/database/mongoDb/repositories/adminHelper"
import { getuserlist,blockusers,unblockusers,agedetail,genderdetail,totalposts,reportposts } from "../../application/useCases/admin";

const adminControllers =(
adminInterface:adminInterface,
adminHelper:adminHelper
)=>{
    const postMain=adminInterface(adminHelper())

const userlist=asyncHandler(async(req:Request,res:Response)=>{
    const userlistresponse=await getuserlist(postMain)
    console.log(userlistresponse,"222222222kkkkkk22222888");
    
    res.json(userlistresponse)
})

const blockuser=asyncHandler(async(req:Request,res:Response)=>{
    const userlistresponse=await blockusers(req.params.userId,postMain)
    console.log(userlistresponse,"222222222kkkkkk22222888");
    
    res.json(userlistresponse)
})

const unblockuser=asyncHandler(async(req:Request,res:Response)=>{
    const userlistresponse=await unblockusers(req.params.userId,postMain)
    console.log(userlistresponse,"222222222kkkkkk22222888");
    
    res.json(userlistresponse)
})

const genderdetails=asyncHandler(async(req:Request,res:Response)=>{
    const genderesponse=await genderdetail(postMain)
    res.json(genderesponse)
})

const agedetails=asyncHandler(async(req:Request,res:Response)=>{
    const ageresponse=await agedetail(postMain)
    res.json(ageresponse)
})

const totalpost=asyncHandler(async(req:Request,res:Response)=>{
    const response=await totalposts(postMain)
    res.json(response)
  })

const reportpost=asyncHandler(async(req:Request,res:Response)=>{
    const response= await reportposts(postMain)
    res.json(response)
})





return {
    userlist,
    blockuser,
    unblockuser,
    genderdetails,
    agedetails,
    totalpost,
    reportpost
}
}

export default adminControllers