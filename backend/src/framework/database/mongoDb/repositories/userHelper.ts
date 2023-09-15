import User from "../models/userModel";

interface userInterface {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password?: string;
}

export const userHelper = () => {
  const addUser = async (addedUser: userInterface) => {
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
    return await User.find()
  }

  const followPost=async (userId:string,auserId:string)=>{
    try{
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

  const unfollowPost=async(userId:string,auserId:string)=>{
    try{
     const [unfollowUser,unfollowAuser]=await Promise.all([
      User.updateOne({id:userId},{$pull:{following:auserId}}),
      User.updateOne({_id:auserId},{$pull:{follwers:userId}})
     ])

     return {unfollowUser,unfollowAuser}
    }catch (error)
    {
      console.log(error);
      
    }
  }

  return {
    addUser,
    getUserByEmail,
    getUserByUserName,
    getUserByMobile,
    getUserByNameMailMobile,
    getAlluser,
    followPost,
    unfollowPost
  };
};

export type userHelper = typeof userHelper;
