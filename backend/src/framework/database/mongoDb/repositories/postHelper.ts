
import Post from "../models/postModel";
import Comment from "../models/commentModel";
import mongoose, { Mongoose, ObjectId } from 'mongoose'



interface postInterface {
  userName: string;
  caption: string;
  imgVideoURL: string;
  userId:string | mongoose.Types.ObjectId
}

export const postHelper = () => {
  const addPost = async (post: postInterface) => {
  // const userID=new mongoose.Types.ObjectId(post.userId)
    
  //   post.userId = userID
    const newPost = new Post(post)
    return await newPost.save();
  };
  

  const likePost=async (postId:string,userName:string)=>{
    
    return await Post.updateOne({_id:postId},{$addToSet:{liked:userName}})
    
     };

  const unlikePost =async (postId:string,userName:string)=>{
    return await Post.updateOne({_id:postId},{$pull:{liked:userName}})
    
  }

  const reportPost = async (postId:string,postedUsername:string,userId:string,selectedOption:string)=>{
   
    console.log(userId,"888888888888888");
    
    return await Post.updateOne({_id:postId},{$addToSet:{reports:{postedUsername,userId,selectedOption}}})
    }

    const singleuserPost = async (userId:string)=>{
    try {
    const singleuser=  await Post.find({userId:userId}).sort({createdAt:-1})
    if(singleuser) {
      return singleuser
    } else {
      return []
    }
    }catch(error)
    {
      console.log(error);
      
    }
   
    }

    const deletePost = async (postId:string)=>{
      console.log(postId,"221111111111111111");
      
      const postID=new mongoose.Types.ObjectId(postId.toString())
      return await Post.deleteOne({_id:postID})
      
      
    }

    const addComment = async(postId:string,userId:string,userName:string,comment:string,commented:string,commentId?:string)=>{
      if(commentId?.length)
      {
        // const comments=comment.replace(`@${replyToUser}`,'')
        const replyComment={
          _id:new mongoose.Types.ObjectId(),
          comment,
          commented,
          liked:[],
          listed:true,
          createdAt:new Date()
        }
     console.log(replyComment,"reply");
     
       return await Comment.updateOne({_id:commentId},{$push:{reply:replyComment}})
     
      }else { 

       const newComments= new Comment ({postId,userName, userId,comment})
            
            console.log(newComments,"00000000000000000/");
            
        return await newComments.save()
        
        
      }
    }
      
     const getComment=async (postId:string)=>{
      console.log(typeof postId,"llllllllllllllllllhewopllllll");
      const postID=new mongoose.Types.ObjectId(postId)
      return await Comment.aggregate([
          {
            '$match': {
              'postId': postID
            }
          }
          , {
            '$lookup': {
              'from': 'users', 
              'localField': 'userId', 
              'foreignField': '_id', 
              'as': 'result'
            }
          }, {
            '$unwind': {
              'path': '$result'
            }
          }, {
            '$project': {
              'profilepic': '$result.profilePic', 
              'comment': 1, 
              'userName': 1, 
              'reply': 1, 
              'liked': 1
            }
          }
        ])
        
        
      
    }

    const commentSize=async (postId:string)=>{
      return await Comment.find({postId:postId})
      
    }

    const deleteComments = async (commentId:string) => {
      try {
        return  await Comment.deleteOne({ _id:new mongoose.Types.ObjectId(commentId)  });
        
       
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }

    const editComments =async (commentId:string,comment:string)=>{
      try{
      return await Comment.updateOne({_id:new mongoose.Types.ObjectId(commentId)}, {comment:comment})
      
        
        
      }catch (error)
      {
        console.log(error);
        
      }
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
    deleteComments,
    editComments

  };
};

export type postHelper = typeof postHelper;