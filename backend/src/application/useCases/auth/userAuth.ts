import { UserDbinterface } from "../../repositories/userDbrepository";
import { AuthServiceInterface } from "../../services/authServiceInterfaces";

export const userSignUp = async(
    user:{
         firstName:string,
         lastName:string,
        userName:string,
        email:string,
        password:string,
        mobile:string,
        age:number,
        gender:string
    },
    userRepository:ReturnType<UserDbinterface>,
    authService:ReturnType<AuthServiceInterface>
)=>{
    user.email = user.email.toLowerCase()
    const isEmailExist = await userRepository.getUserByEmail(user.email)
    if(isEmailExist){
        const userData = {
            status:"failed",
            message:"Email already exists",
            user:{},
            token:''
        }

        console.log(userData,"0000000000000000000000");
        
        return userData
    }
    const isUserNameExist = await userRepository.getUserByUsername(user.userName)
    if(isUserNameExist){
        const userData = {
            status:"failed",
            message:"Username already exists",
            user:{},
            token:''
        }

        return userData
        
    }
    let encryptPassword = await authService.encryptPassword(user.password)
    user.password = encryptPassword
    const data = await userRepository.addUser(user)
    const jwtToken = await authService.generateToken(data._id?.toString())
    const userData = {
        status:"success",
        message:"Registration Success",
        user:data,
        token:jwtToken
    }

    
    return userData
}

export const userSignIn = async(
    email:string,
    password:string,
    userRepository:ReturnType<UserDbinterface>,
    authService:ReturnType<AuthServiceInterface>
)=>{
    const data = await userRepository.getUserByEmail(email)

    console.log(data,"777777777777777777");
    
    
    if(!data){
        const userData = {
            status:"failed",
            message:"User does not exist",
            user:{},
            token:''
        }
        console.log(userData,"8888888888888888888888");
        
        return userData
    }

    if(data.isBlock){
        const userData = {
            status:"failed",
            message:"User is blocked",
            user:{},
            token:''
        }
        return userData
    }
    const isPassword = await authService.comparePassword(password,data?.password)
    
    if(!isPassword){
        const userData = {
            status:"failed",
            message:"Password incorrect",
            user:{},
            token:''
        }
        return userData
    }

    const jwtToken = await authService.generateToken(data?._id?.toString())
    data.password = '';
    const userData = {
        status:"success",
        message:"Sign in Success",
        user:data,
        token:jwtToken
    }

    return userData
}



export const googleuserSignIn = async(
    email:string,
    userRepository:ReturnType<UserDbinterface>,
    authService:ReturnType<AuthServiceInterface>
)=>{
    const data = await userRepository.getUserByEmail(email)

    console.log(data,"777777777777777777");
    
    
    if(!data){
        const userData = {
            status:"failed",
            message:"User does not exist",
            user:{},
            token:''
        }
        console.log(userData,"8888888888888888888888");
        
        return userData
    }

    if(data.isBlock){
        const userData = {
            status:"failed",
            message:"User is blocked",
            user:{},
            token:''
        }
        return userData
        console.log(userData,"9999999999");
    }
   
    
   

    const jwtToken = await authService.generateToken(data?._id?.toString())
    data.password = '';
    const userData = {
        status:"success",
        message:"Sign in Success",
        user:data,
        token:jwtToken
    }

    return userData
}

export const googleuserSignUp = async(
    user:{
        userName:string,
        email:string ,
    },
  
    userRepository:ReturnType<UserDbinterface>,
    authService:ReturnType<AuthServiceInterface>
)=>{
   var  emails = user. email.toLowerCase()
    const isEmailExist = await userRepository.getUserByEmail(emails)
    if(isEmailExist){
        const userData = {
            status:"failed",
            message:"Email already exists",
            user:{},
            token:''
        }

        console.log(userData,"0000000000000000000000");
        
        return userData
    }
    const isUserNameExist = await userRepository.getUserByUsername(user.userName)
    if(isUserNameExist){
        const userData = {
            status:"failed",
            message:"Username already exists",
            user:{},
            token:''
        }

        return userData
        
    }
    // let encryptPassword = await authService.encryptPassword(user.password)
    // user.password = encryptPassword

    const data = await userRepository.googleaddUser(user)
    console.log(data,"33333333333333");
    
    const jwtToken = await authService.generateToken(data._id?.toString())
    const userData = {
        status:"success",
        message:"Registration Success",
        user:data,
        token:jwtToken
    }

    
    return userData
}