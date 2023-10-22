import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { singleUserdetails } from '../../api/apiConnections/userConnections';
import { PROFILE_POST_URL } from '../../api/baseURL';
import { Avatar} from "@material-tailwind/react"
const Singlereply = ({reply,profilepic,focusTextAreaReply}) => {
const {userId} =useSelector((state)=>state.user.userId)
console.log(reply,"replyyyyyyy",profilepic);
useEffect(()=>{
  singleUser
},[userId])
    
  const singleUser = async()=>
     {
      const singleuserresponse=singleUserdetails(userId)
      console.log(singleuserresponse,"3333333333333311111111111reply");
     }

  return (
    <div className='flex ms-16'>
        <div>
        <Avatar  src={PROFILE_POST_URL+profilepic} size="sm" /> 
        </div>
        <div className="flex flex-col ms-6 mt-2 w-9">
            <p className="font-sans text-sm">{reply.commentUsername}</p>
            <p className='className="text-sm text-blue-gray-200 font-sans'>{reply.comment}</p>
           <button><p className="text-xs text-blue-gray-300" onClick={focusTextAreaReply(reply._id,focusTextAreaReply.com)}>reply</p></button> 
            
        </div>
    
    </div>
    
    
  )
}

export default Singlereply