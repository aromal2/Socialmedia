import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { singleUserdetails } from '../../api/apiConnections/userConnections'
import { followPost,unfollowPost } from '../../api/apiConnections/userConnections'



const Sidebarfriends = ({alluser}) => {
let userId=useSelector((state)=>state.user.userId)

 const [followings,setFollowing]=useState("")
console.log(alluser,"44444222111113333333");

useEffect(()=>{
  fetchUserResponse
},[])
 
    const fetchUserResponse = async () => {
      try {
        const userResponse = await singleUserdetails(userId);
         console.log(userResponse,"sidebarrrr")
         
         const following = userResponse[0].following.includes(alluser._id);
         setFollowing(following)
      } catch (error) {
        console.error(error);
      }
    };

  ;

  
  const follow =async(auserId)=>

{
   return await followPost(userId,auserId)
}

const unfollow =async(auserId)=>{

  {
     return await unfollowPost(userId,auserId)
  }
  
}
return (
  <div>
  <div className="flex justify-between mt-2 font-sans text-sm">
    {alluser.userName}
      <button className="mt-1 text-custom-500 hover:text-black font-medium" onClick={() => unfollow(alluser._id)}>unfollow</button>  <button className="mt-1 text-custom-500 hover:text-black font-medium" onClick={() => follow(alluser._id)}>follow</button>
     
     
     
  </div>
</div>

  )
}

export default Sidebarfriends