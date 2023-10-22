import baseURL from "../api";

export const Login=async(values)=>{
    try {
        console.log(values,"2222222222222");
        const response=await baseURL.post("adminauth/adminlogin",values)
        console.log(response.data,";;;;;;;;");
         return response.data
    }catch (error) {
console.log(error,"login");
    }
}