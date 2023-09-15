import { Request, Response, request, response } from "express";
import asyncHandler from "express-async-handler";

import { postHelper } from "../../framework/database/mongoDb/repositories/postHelper";
import { postInterface } from "../../application/repositories/postDbrepository";
import { getAllpost, addNewPost,likeonePost,unlikeonePost,reportPosts} from "../../application/useCases/post";
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

  const getPost = asyncHandler(async (req: Request, res: Response) => {
    const response = await getAllpost(postMain);
   
    res.json(response);
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
      const response = await reportPosts(req.body.postId,req.body.userId,req.body.selectedOption,postMain)
         console.log(response,"777777777777777777");
         
         res.json(response)
    })





  return {
    addPost,
    getPost,
    likePost,
    unlikePost,
    reportPost
  


  };
};



export default postControllers;
