import { ObjectId } from "mongoose";
import Admin from "../models/adminModel";
import User  from "../models/userModel"
import Post  from "../models/postModel"
import mongoose from "mongoose"



export const adminHelper = () => {

  const getUserByEmail = async (email: string) => {
    return await Admin.findOne({ email });
  };

  const getUserlist = async () => {
    return await User.find().sort({ createdAt: 1 });
  }
  const blockuser = async (userId:string) => {
    console.log(userId,"5555555555555555555");
    
    return await User.updateOne({ _id: userId }, { isBlock: false }); // Use true without quotes for a boolean value
  };

  const unblockuser = async (userId:string) => {
    console.log(userId,"unblockkkkk");
    
    return await User.updateOne({ _id: userId }, { isBlock: true }); // Use true without quotes for a boolean value
  };


  const genderdetail = async () => {
    return await User.aggregate([
      {
        '$group': {
          '_id': '$gender',
          'count': {
            '$sum': 1
          }
        }
      }
    ]);
  }
  
   const agedetail = async () => {
    try {
      return  await User.aggregate([
        {
          '$facet': {
            'agelessthan18': [
              {
                '$match': {
                  'age': {
                    '$lte': 18
                  }
                }
              }
            ], 
            'age18and25': [
              {
                '$match': {
                  'age': {
                    '$gte': 18, 
                    '$lte': 25
                  }
                }
              }
            ], 
            'ageabove25': [
              {
                '$match': {
                  'age': {
                    '$gte': 25
                  }
                }
              }
            ]
          }
        }, 
        {
          '$project': {
            'agelessthan18': {
              '$size': '$agelessthan18'
            }, 
            'age18and25': {
              '$size': '$age18and25'
            }, 
            'ageabove25': {
              '$size': '$ageabove25'
            }
          }
        }
      ]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  //   console.log(userId,"unblockkkkk");
    
  //   return await User.updateOne({ _id: userId }, { isBlock: true }); // Use true without quotes for a boolean value
   };

   
   const totalpost = async () => {
    try {
      return await Post.aggregate([
        {
          $group: {
            _id: null, // If you want to group all documents, set _id to null
            count: {
              $sum: 1
            }
          }
        }
      ]);
    } catch (error) {
      console.error("Error aggregating documents:", error);
      throw error;
    }
  };


  const reportpost = async ()=>{
    try {
      return await Post.aggregate(
        [
          {
            '$project': {
              'userName': 1, 
              'imgVideoURL': 1, 
              'likelength': {
                '$size': '$liked'
              }, 
              'reportsLength': {
                '$size': '$reports'
              }
            }
          }
        ]
      )
    }
  catch(error)
{
  console.log(error);
  
}}
  
  




  
  

return {
  getUserByEmail,
  getUserlist,
  blockuser,
  unblockuser,
  genderdetail,
  agedetail,
  totalpost,
  reportpost 



}
}



export type adminHelper= typeof adminHelper