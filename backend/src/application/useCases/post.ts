import { ObjectId } from "mongoose";
import { postInterface } from "../repositories/postDbrepository";



export async function addNewPost(
  userName: string,
  caption: string,
  userId: string,
  imgVideoURL: string,
  postRepository: ReturnType<postInterface>
) {
  const post = {
    userName,
    caption,
    imgVideoURL,
    userId,
  };
  const data = await postRepository.addPost(post);

  if (data) return data;
}

export async function likeonePost(
  postId: string,
  username: string,
  postRepository: ReturnType<postInterface>
) {
  const likeddata = await postRepository.likePost(postId, username);
  if (likeddata) return likeddata;
}

export const unlikeonePost = async (
  postId: string,
  username: string,
  postRepository: ReturnType<postInterface>
) => {
  const unlikeddata = await postRepository.unlikePost(postId, username);
  if (unlikeddata) return unlikeddata;
};

export const reportPosts = async (
  postId: string,
  postedUsername:string,
  userId:string,
  selectedOption: string,
  postRepository: ReturnType<postInterface>
) => {

  const reportdata = await postRepository.reportPost(
    postId,
    postedUsername,
    userId,
    selectedOption
  );
  if (reportdata) return reportdata;
};

export const singleuserPost = async (
  userId: string,
  postRepository: ReturnType<postInterface>
) => {
  const getOnedata = await postRepository.singleuserPost(userId);
  if (getOnedata) return getOnedata;
};

export const deletePost = async (
  postId: string,
  postRepository: ReturnType<postInterface>
) => {
  const deletePost = await postRepository.deletePost(postId);
  if (deletePost) return deletePost
  console.log(deletePost,"usecasedel");
  
};

export const addComments = async (
  postId: string,
  userId: string,
  userName:string,
  comment:string,
  commented:string,
   commentId:string,
 postRepository: ReturnType<postInterface>
) => {
  const addComment = await postRepository.addComment(
    postId,
    userId,
    userName,
    comment,
    commented,
    commentId
  ) 
   if(addComment) return addComment
    
};

export const getComments = async (
  postId: string,
  postRepository: ReturnType<postInterface>
) => {
  const getComment = await postRepository.getComment(postId);
   if(getComment) return getComment
};

export const commentsSize= async (
  postId:string,
  postRepository:ReturnType<postInterface>
)=>{
  const commentSize=await postRepository.commentSize(postId)
  if(commentSize) return commentSize
  
}

export const deleteComments=async(
  commentId:string,
  postRepository:ReturnType<postInterface>
)=>{
  const deleteComment=await postRepository.deleteComment(commentId)
  
   if(deleteComment) return deleteComment
 }

 export const editComments=async(
  commentId:string,
  comment:string,
  postRepository:ReturnType<postInterface>
 )=>{
  const editCommented=await postRepository.editComment(commentId,comment)
   if(editCommented) return editCommented
 }

 

