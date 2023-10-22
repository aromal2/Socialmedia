import {Request,Response} from "express"
import asyncHandler from 'express-async-handler'

import  {AuthServices} from "../../framework/services/authServices" 
import { AuthServiceInterface } from "../../application/services/authServiceInterfaces";

import {UserDbinterface } from "../../application/repositories/userDbrepository";

import { userHelper } from "../../framework/database/mongoDb/repositories/userHelper";
import { userSignUp,userSignIn,googleuserSignIn, googleuserSignUp,} from "../../application/useCases/auth/userAuth";


const userAuthcontrollers = (
    AuthServiceInterface:AuthServiceInterface,
    AuthServices:AuthServices,
   UserDbinterface:UserDbinterface,
    UserHelper:userHelper

)=>{
    const userDbrepository=UserDbinterface(UserHelper())
    const authService = AuthServiceInterface(AuthServices())
    const signUpUser = asyncHandler(async(req:Request,res:Response)=>{
        
        
        const {firstName,lastName,userName,email,password,mobile,age,gender} = req.body
        
        const user = {
            firstName,
            lastName,
            userName,
            email,
            password,
            mobile,
            age,
            gender

        }
        const userData = await userSignUp(user,userDbrepository,authService)
        res.json(userData)
    })

    const signInUser = asyncHandler(async(req:Request,res:Response)=>{
        const {email,password} : {email:string,password:string} = req.body
       const userData = await userSignIn(email,password,userDbrepository,authService)
        res.json(userData)
    })

    const googlesigninUser =asyncHandler(async(req:Request,res:Response)=>{
        console.log(req.body,"7777body");
        
        
        const userData =await  googleuserSignIn(req.body.email,userDbrepository,authService)
        res.json(userData)
    })

    const googlesignupUser =asyncHandler(async(req:Request,res:Response)=>{
    const {userName,email}=req.body
            const user ={
                userName,email
            }
        
        const userData =await googleuserSignUp(user,userDbrepository,authService)
        res.json(userData)
    })

    return {
        
        
        signUpUser,
        signInUser,
        googlesigninUser,
        googlesignupUser
    }
   }
   export default userAuthcontrollers

