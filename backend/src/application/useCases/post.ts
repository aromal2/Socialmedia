import { ObjectId } from "mongoose";
import { postInterface } from "../repositories/postDbrepository";

export const getAllpost = async(postRepository:ReturnType<postInterface>)=>{
   
    const data= await postRepository.getAllpost()
    
   if(data)
   {
    return data
   }

}

export async function addNewPost(
    userName: string,
    caption: string,
    userId:string,
    imgVideoURL: string,
    postRepository: ReturnType<postInterface>) {
    const post = {
        userName,
        caption,
        imgVideoURL,
        userId
    };
    const data = await postRepository.addPost(post);
    console.log(data,"44444444444444444usecasss");
    
    if (data)  return data;

}

export async function likeonePost(
    postId:string,
    username:string,
    postRepository:ReturnType<postInterface>
    )
    {
   const likeddata=await postRepository.likePost(postId,username)
   if (likeddata) return likeddata
   }

    export const  unlikeonePost = async (
        postId:string,
        username:string,
        postRepository:ReturnType<postInterface>
    )=>{

    const unlikeddata=await postRepository.unlikePost(postId,username)
if(unlikeddata) return  unlikeddata
    }

    export const reportPosts = async (
        postId:string,
        userId:string,
        selectedOption:string,
        postRepository:ReturnType<postInterface>
    )=>{
        console.log(userId,postId,selectedOption,"5555555555555555555555dfghjkxcvbn");
        
        const reportdata= await postRepository.reportPost(postId,userId,selectedOption)
         if(reportdata) return reportdata
    }


