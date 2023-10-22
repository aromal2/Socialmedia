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

        const likePost =async (postId:string,username:string)=>{
            return await repository.likePost(postId,username)
           }

           const unlikePost =async (postId:string,reason:string)=>{
            return await repository.unlikePost(postId,reason)
           }

           const reportPost=async (postId:string,postedUsername:string,userId:string,selectedOption:string)=>{
            return await repository.reportPost(postId,postedUsername,userId,selectedOption)
           }
           
           const singleuserPost=async(userId:string)=>{
            return await repository.singleuserPost(userId)
           }
           
           const deletePost=async(postId:string)=>{
            return await repository.deletePost(postId)
           }
           
           const addComment=async(postId:string,userId:string,userName:string,comment:string,commented:string,commentId:string)=>{
            return await repository.addComment(postId,userId,userName,comment,commented,commentId)
            
            
           }

           const getComment=async(postId:string)=>{
            return await repository.getComment(postId)
           }

           const commentSize=async(postId:string)=>{
            return await repository.commentSize(postId)
           }

           const deleteComment=async(commentId:string)=>{

            return await repository.deleteComments(commentId)
           }

           const editComment=async(commentId:string,comment:string)=>{
            return await repository.editComments(commentId,comment)
           }


          



    return {
         addPost,
         likePost,
         unlikePost,
         reportPost,
          singleuserPost,
          deletePost,
          addComment,
          getComment,
          commentSize,
          deleteComment,
          editComment
}

}


export  type  postInterface=typeof postDbrepository