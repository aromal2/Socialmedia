import {Request,Response} from "express"
import asyncHandler from 'express-async-handler'

import  {AuthServices} from "../../framework/services/authServices" 
import { AuthServiceInterface } from "../../application/services/authServiceInterfaces";
import {UserDbinterface } from "../../application/repositories/userDbrepository";
import { userHelper } from "../../framework/database/mongoDb/repositories/userHelper";
import { userSignUp,userSignIn } from "../../application/useCases/auth/userAuth";

const userAuthcontrollers = (
    AuthServiceInterface:AuthServiceInterface,
    AuthServices:AuthServices,
   UserDbinterface:UserDbinterface,
    UserHelper:userHelper

)=>{
    const userDbrepository=UserDbinterface(UserHelper())
    const authService = AuthServiceInterface(AuthServices())
    const signUpUser = asyncHandler(async(req:Request,res:Response)=>{
        
        
        const {firstName,lastName,userName,email,password,mobile,age} = req.body
        
        const user = {
            firstName,
            lastName,
            userName,
            email,
            password,
            mobile,
            age
        }
        const userData = await userSignUp(user,userDbrepository,authService)
        res.json(userData)
    })

    const signInUser = asyncHandler(async(req:Request,res:Response)=>{
        const {userName,password} : {userName:string,password:string} = req.body
        const userData = await userSignIn(userName,password,userDbrepository,authService)
        console.log(userData,"6666666666666666")
        res.json(userData)
    })

    return {
        
        
        signUpUser,
        signInUser
    }
   }
   export default userAuthcontrollers

