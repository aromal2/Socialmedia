import { ObjectId } from "mongoose";
import { postHelper } from "../../framework/database/mongoDb/repositories/postHelper";

export const postDbrepository =(repository:ReturnType<postHelper>)=>{
   

    const addPost=async (post:{
        userName:string,
        caption:string,
        userId:string,
        imgVideoURL:string,
    })=>{
        
         return await repository.addPost(post)

        }

        const getAllpost =async()=>{
            return await repository.getPost()
        }

        const likePost =async (postId:string,username:string)=>{
            return await repository.likePost(postId,username)
           }

           const unlikePost =async (postId:string,reason:string)=>{
            return await repository.unlikePost(postId,reason)
           }

           const reportPost=async (postId:string,userId:string,selectedOption:string)=>{
            return await repository.reportPost(postId,userId,selectedOption)
        
            
           }
    
    return {
         addPost,
         getAllpost,
         likePost,
         unlikePost,
         reportPost
}

}


export  type  postInterface=typeof postDbrepository