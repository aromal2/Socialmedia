import { adminInterface } from "../../repositories/adminDbrepository";
import { adminauthServiceInterface} from "../../services/adminauthServiceInterfaces"

export const adminSignIn = async(
    Email:string,
    password:string,
    adminRepository:ReturnType<adminInterface>,
    adminAuthService:ReturnType<adminauthServiceInterface>
)=>{
    const data:any = await adminRepository.getUserByEmail(Email)

    console.log(data,"authhhhhhhhhhhhhh");
    
    
     if(!data){
        const userData = {
            status:"failed",
            message:"User does not exist",
            user:{},
            token:''
        }
        
        
         return userData
    }


    if(!data){
        const userData = {
            status:"failed",
            message:"User is blocked",
            user:{},
            token:''
        }
        return userData
    }


    const isPassword = await adminAuthService.comparePassword(password,data.password)
    
    if(!isPassword){
        const userData = {
            status:"failed",
            message:"Password incorrect",
            user:{},
            token:''
        }
        return userData
}
   


    const jwtToken = await adminAuthService.generateToken(data?._id.toString())
    const userData = {
        status:"success",
        message:"Sign in Success",
        user:data,
        token:jwtToken
    }

    return userData;
     
}