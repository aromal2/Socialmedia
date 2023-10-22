import { Request,Response } from "express";
import asyncHandler from 'express-async-handler'

import {adminAuthservices} from "../../framework/services/adminAuthservices";
import {adminauthServiceInterface}  from "../../application/services/adminauthServiceInterfaces"
import {adminInterface} from "../../application/repositories/adminDbrepository"
import  {adminHelper} from "../../framework/database/mongoDb/repositories/adminHelper"


import { adminSignIn } from "../../application/useCases/auth/adminAuth";



const adminAuthControllers =(
    adminauthServicesInterface:adminauthServiceInterface,
    adminAuthservices:adminAuthservices,
    adminInterfaces:adminInterface,
    adminhelper:adminHelper

    
)=>{
   
    const adminauthService=adminauthServicesInterface(adminAuthservices())

    const adminDbrepository=adminInterfaces(adminhelper())
  
    const signInUser=asyncHandler(async(req:Request,res:Response)=>{

        console.log(req.body,"3333req.body");
        
        const adminData= await adminSignIn(req.body.email,req.body.password,adminDbrepository,adminauthService)
        console.log(adminData,"-==================[[[]]]");
        
        res.json(adminData)
    })


    return {
        signInUser
    }

}

export default adminAuthControllers