import { Mongoose, ObjectId } from "mongoose";
import Post from "../models/postModel";
import mongoose from 'mongoose'


interface postInterface {
  userName: string;
  caption: string;
  imgVideoURL: string;
  userId:string | mongoose.Types.ObjectId
}

export const postHelper = () => {
  const addPost = async (post: postInterface) => {
    console.log(post.userId,"6666666666666666");
    
    const userID=new mongoose.Types.ObjectId(post.userId)
    console.log(userID,"helperrrrrrrrrrrrrrrr");
    
    post.userId = userID
    const newPost = new Post(post)
    return await newPost.save();
  };
  const getPost = async () => {
    return await Post.find().sort({ createdAt: -1 });
  };

  const likePost=async (postId:string,userName:string)=>{
    
    return await Post.updateOne({_id:postId},{$addToSet:{liked:userName}})
    
     };

  const unlikePost =async (postId:string,userName:string)=>{
    return await Post.updateOne({_id:postId},{$pull:{liked:userName}})
    
  }

  const reportPost = async (postId:string,userId:string,selectedOption:string)=>{
    // const postID = new mongoose.Types.ObjectId(postId)
    // console.log(postID,selectedOption,userId);
    
    return await Post.updateOne({_id:postId},{$addToSet:{reports:{userId,selectedOption}}})
    
    
  }

  

  return {
    addPost,
    getPost,
    likePost,
    unlikePost,
    reportPost
  };
};

export type postHelper = typeof postHelper;