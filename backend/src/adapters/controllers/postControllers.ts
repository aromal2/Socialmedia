import { Request, Response, request, response } from "express";
import asyncHandler from "express-async-handler";

import { postHelper } from "../../framework/database/mongoDb/repositories/postHelper";
import { postInterface } from "../../application/repositories/postDbrepository";
import {addNewPost,likeonePost,unlikeonePost,reportPosts,singleuserPost,addComments,getComments,deletePost,commentsSize,deleteComments,editComments} from "../../application/useCases/post";
const postControllers = (
  postInterface: postInterface,
  postHelper: postHelper
) => {
  
    const postMain = postInterface(postHelper());

  const addPost = asyncHandler(async (req: Request, res: Response) => {
  
    
    const cloudinaryPost = req?.file?.path?.split("/post-")[1] as string;
    const postResponse = await addNewPost(
      req.body.userName,
      req.body.caption,
      req.body.userid,
     cloudinaryPost,
      postMain
    );
    
    res.json(postResponse);
  });

 

  const likePost =asyncHandler(async(req:Request ,res:Response)=>{
  let userName=req.body.userName
  let postid=req.body.postId

   const response = await likeonePost(postid,userName,postMain)
   res.json(response)

})


const unlikePost =asyncHandler(async(req:Request ,res:Response)=>{

    
    let userName=req.body.userName
    let postId=req.body.postId
    const response = unlikeonePost( postId,userName,postMain );
    res.json(response)
    
    })

    const reportPost =asyncHandler(async(req:Request,res:Response)=>{
      const response = await reportPosts(req.body.postId,req.body.postedUsername,req.body.userId,req.body.selectedOption,postMain)
         console.log(response,"777777777777777777");
         
         res.json(response)
    })

    const singleUserpost=asyncHandler(async(req:Request,res:Response)=>{
      
      const response = await singleuserPost(req.params.userId,postMain)
      
      res.json(response)
    })

    const deletepost=asyncHandler(async(req:Request,res:Response)=>{
console.log(req.params,"deletepost");

      const response =await deletePost(req.params.postId,postMain)
    
      
      res.json(response)
    })
    
    const addComment=asyncHandler(async(req:Request,res:Response)=>{
      const response= await addComments(req.body.postId,req.body.userId,req.body.userName,req.body.comment,req.body.commented,req.body.commentId,postMain)
      res.json(response)
    })

    const getComment=asyncHandler(async(req:Request,res:Response)=>{
      const response= await getComments(req.body.postId,postMain)
      console.log(response,"999999999999999");
       res.json(response)
    })

    const commentSize=asyncHandler(async(req:Request,res:Response)=>{
      const response=await commentsSize(req.body.postId,postMain)
      res.json(response)
    })
  
    const deleteComment=asyncHandler(async(req:Request,res:Response)=>{
      console.log(req.body.commentId,"0000000uuuu0000000000")
      
      const response=await deleteComments(req.body.commentId,postMain)
      res.json(response)
      
    })
    
    const editComment=asyncHandler(async(req:Request,res:Response)=>{
      const response=await editComments(req.body.commentId,req.body.comment,postMain)
      res.json(response)
    })

   

    

    

   

  return {
    addPost,
    likePost,
    unlikePost,
    reportPost,
    singleUserpost,
    deletepost,
    addComment,
    getComment,
    commentSize,
    deleteComment,
    editComment,
    
    
  


  };
};



export default postControllers;
