import { Aggregate, ObjectId } from "mongoose";
import User from "../models/userModel";
import verifyProfiles from "../models/verifyProfileModel";
import mongoose from "mongoose";


interface userInterface {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password?: string;
  age:Number;
  gender:string;

}

interface googleInterface {
  email:string,
  userName:string
}

interface profileInterface {
  email:string,
  brand:string,
  price:number
}

export const userHelper = () => {
  const addUser = async (addedUser: userInterface) => {
    const newUser = new User(addedUser);
    return await newUser.save();
  };

 
  const googleaddUser = async ( addedUser:googleInterface) => {
    const newUser = new User(addedUser);
    return await newUser.save();
  };

  const getUserByEmail = async (email: string) => {
    return await User.findOne({ email });
  };

  const getUserByUserName = async (userName: string) => {
    return await User.findOne({ userName });
  };

  const getUserByMobile = async (mobile: string) => {
    return await User.findOne({ mobile });
  };

  const getUserByNameMailMobile = async (userData: string) => {
    return await User.findOne({
      $or: [{ userName: userData }, { email: userData }, { mobile: userData }],
    });
  };


  const getAlluser=async ()=>{
    return await User.aggregate([{
      $project:{
        _id:1,
        userName:1
      }}
    ])
  }

  const getAllposts=async (userId:string)=>{
    console.log(userId,"0000000000000000l");
    
  try{
    const getallposts= await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId)
        }
      },
       {
        $unwind: {
          path: "$following"
        }
      },
      {
        $addFields:{
          followingId:{
            "$toObjectId":"$following"
          }
        }
      }
       , {
        $lookup: {
          from: 'posts', 
          localField: 'followingId', 
          foreignField: 'userId', 
          as: 'result'
        }
      },
       {
        $unwind: {
         path: '$result'
        }
      }
      ,{
        $lookup: {
          from: 'users', 
          localField:'result.userId', 
          foreignField: '_id', 
          as: 'postprofile'
        }
      }, {
        $unwind: {
          'path': '$postprofile'
        }
      }, 
      {
        $project : {
          imgVideoURL: '$result.imgVideoURL', 
          caption: '$result.caption', 
          postedUsername: '$result.userName', 
          liked: '$result.liked', 
          posteduserpic: '$postprofile.profilePic', 
          postcreatedAt: '$postprofile.createdAt',
          postId:'$result._id'
        }
      }, {
        $sort: {
          postcreatedAt: -1
        }
      }
    ])
    console.log(getallposts,"88888888888888555555555555");
    
     if(getallposts)
     {
      return getallposts
    }else{
       return []
    }
  } catch(error)
  {
    console.log(error);
    
  }
    
  }

  const followPost=async (userId:ObjectId,auserId:ObjectId)=>{
    try{
      console.log(auserId,"555555555555555555")
      
     
      const [updateUser,updateAuser] =await Promise.all([
        User.updateOne({_id:userId},{$addToSet:{following:auserId}}),
        User.updateOne({_id:auserId},{$addToSet:{followers:userId}})
      ])
            return {updateUser,updateAuser}
      
//  return {updateUser,updateAuser}
    }catch(error)
    {
      console.error("Error:", error);
    }
   
  }

  const unfollowPost=async(userId:ObjectId,auserId:ObjectId)=>{
    try{
      
      
     const [unfollowUser,unfollowAuser]=await Promise.all([
      User.updateOne({_id:userId},{$pull:{following:auserId}}),
      User.updateOne({_id:auserId},{$pull:{followers:userId}})
     ])

     return {unfollowUser,unfollowAuser}
    }catch (error)
    {
      console.log(error);
      
    }
  }

  const getOneuser=async (userId:string)=>{
    try {
          
      const userID=new mongoose.Types.ObjectId(userId);

      return await User.find({_id:userID})
      
    }catch (error)
    {
console.log(error,"getoneuser");

    }
  }

  const savedPost = async (userId: string, postId: any) => {
    try {
      const userID = new mongoose.Types.ObjectId(userId);
      const postID = new mongoose.Types.ObjectId(postId); // Convert postId to ObjectId
      const savedPost= await User.updateOne(
        { _id: userID },
        { $addToSet: { saved: postID } } // Use postID as an ObjectId
      );

      if(savedPost)
      {
        return savedPost
      }else{
        return []
      }
      
      
    } catch (error) {
      console.error(error);
    }
  };

  const unsavedPost = async(userId :string,postId:any)=>{
    try{
      const userID = new mongoose.Types.ObjectId(userId);
      const postID = new mongoose.Types.ObjectId(postId); 
      return await User.updateOne(
        {_id:userID},
        {$pull:{saved:postID}} )
        
    }catch (error)
    {
      console.log(error);
      
    }
  }

  const getSavedpost = async (userId: string) => {
    try {
      const savedPosts = await User.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(userId) }
        },
        {
          $unwind: {
            path: "$saved"
          }
        },
        {
          $lookup: {
            from: "posts",
            localField: "saved",
            foreignField: "_id",
            as: "result"
          }
        },
        {
          $unwind: {
            path: "$result"
          }
        },
        {
          $project: {
            image: "$result.imgVideoURL",
            caption: "$result. caption"
          }
        }
      ]);
  
      return savedPosts;
    } catch (error) {
      console.error(error);
    }
  };

  const editProfile = async (userid:string, bio:string, gender:string, profilePic:string) => {
    const updateData = {
      profilePic: profilePic,
      bio: bio, // Add the bio and gender fields if you want to update them as well
      gender: gender,
    }
    console.log(updateData,"5555555555555511122222222222helperr");
    
   try {
      return await User.findOneAndUpdate({ _id: userid }, updateData,{ new: true });
  
      
    
     
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error; // Handle the error as needed
    }
  };
  
  const followerDetails = async (userId: string) => {

    try {
      const follower=await User.aggregate([
        {
          $match: {
           _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $unwind: {
            path: '$followers',
          },
        },
        {
          $addFields:{
            followersId:{
              "$toObjectId":"$followers"
            }
          }
        },
        
        {
          $lookup: {
            from: 'users',
            localField: 'followersId',
            foreignField: '_id',
            as: 'result',
          },
        },
        {

          $unwind:{
            path:'$result'
          }
        }
      ]);

      console.log(follower,"streinnnn");
      
      if(follower)
      {
        return follower
      } else{
        return []
      }
  
    } catch (error) {
      console.log(error);
    }
  };
  

  const followingDetails = async (userId:string) => {
    try {
      const following= await User.aggregate(
        [
          {
            '$match': {
              '_id': new mongoose.Types.ObjectId(userId)
            }
          }
          , {
            '$unwind': {
              'path': '$following'
            }
          }
          ,
          {
            '$addFields':{
              'followingId':{
                "$toObjectId":"$following"
              }
            }
          },
          
          {
            '$lookup': {
              'from': 'users', 
              'localField': 'followingId', 
              'foreignField': '_id', 
              'as': 'result'
            }
          },
          {
            '$unwind':{
              'path':'$result'
            }
          }
        ]
        
      );
      if(following)
      {
        return following
      }else{
        return []
      }
    
    }
   
    
    catch (error) {
      console.log(error);
    }
  };

  const searchUser=async (searchQuery:string)=>{
    try{

      console.log(searchQuery,"searchqueryyyyy");
      
      const regexPattern = new RegExp(searchQuery, 'i');

      return await User.find({
        $or:[
          {userName:{$regex:regexPattern}},
          {lastName:{$regex:regexPattern}},
          {firstName:{$regex:regexPattern}}
        ]
      })
      
      

    }catch(error)
    {
      console.log(error,"searchuser");
      
    }
  }


  const profilePost=  async(userId:string)=>{
    try{

     return await User.aggregate([
        {
          '$match': {
            '_id': new mongoose.Types.ObjectId(userId)
          }
        }, {
          '$lookup': {
            'from': 'posts', 
            'localField': '_id', 
            'foreignField': 'userId', 
            'as': 'result'
          }
        }, {
          '$unwind': {
            'path': '$result'
          }
        }, {
          '$project': {
            'imgVideoURL': '$result.imgVideoURL', 
            'caption': '$result.caption', 
            'liked': '$result.liked'
          }
        }
      ])


    }catch(error)
    {
      console.log(error,"profilepost");
      
    }
  }


    const  verifications=async(verifyprofile:profileInterface)=>{
       console.log(verifyprofile,"888888888886666666666");
      
      const verifiedProfile= new verifyProfiles (verifyprofile)
      
       return  await verifiedProfile.save()

      // db.verifyProfiles.createIndex({ "expiryDate": 1 }, { expireAfterSeconds: 0 });



    }

    const verify=async(email:string)=>{
    return await verifyProfiles.findOne({email:email})
    
    
    
    
    }
  
  

  

  return {
    addUser,
    googleaddUser,
    getUserByEmail,
    getUserByUserName,
    getUserByMobile,
    getUserByNameMailMobile,
    getAlluser,
    getAllposts,
    followPost,
    unfollowPost,
    getOneuser,
    savedPost,
    unsavedPost,
    getSavedpost,
    editProfile,
    followerDetails,
    followingDetails,
    searchUser,
    profilePost,
    verifications,
    verify
    

  };
};

export type userHelper = typeof userHelper;
