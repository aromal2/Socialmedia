import React from 'react'
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
   
  } from "@material-tailwind/react";
  
  import {unblock,block} from '../../../api/apiConnections/adminConnection';
  import { PROFILE_POST_URL } from '../../../api/baseURL';
  import { useState } from 'react';
  


const Singleadminuserlist = ({user}) => {
    


const [followunfollow,setFollowunfollow]=useState(user.isBlock)


    const blockuser=async(userId)=>{
        console.log(userId,"44444");
        const blockresponse= await block(userId)
        console.log(blockresponse);
        if(blockresponse){ 
            setFollowunfollow(!followunfollow)
        }
    }
    
       const unblockuser=async(userId)=>{
        const unblockresponse= await unblock(userId)
        console.log(unblockresponse);
        if(unblockresponse){ 
            setFollowunfollow(!followunfollow)
        }
       }

  return (
    
   
      
       
        <tbody>
          
            <tr key={user.userName}>
              <td className="w-24">
                <div className="flex items-center gap-3">
                 {user.profilePic ==" "?(<Avatar
                    
                    src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                    size="md"
                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1 ms-0"
                  />):( <Avatar
                    
                    src={PROFILE_POST_URL+user.profilePic}
                    size="md"
                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1 ms-0"
                  />)} 

                 
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold -ms-2"
                  >
               {user.userName}
                  </Typography>
                </div>
              </td>
              <td className="">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal ms-3"
                >
                {user.email}
                </Typography>
              </td>
              <td className="">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal ms-6"
                >
                  {user.gender}
                </Typography>
              </td>
              <td className="ms-20">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal ms-4"
                >
                  {user.age}
                </Typography>
              </td>
              <td className="">
                {followunfollow ===true ?
                (
                  <td>
                    <button size='sm' onClick={()=>blockuser(user._id)} className='text-custom-500' >Unblock</button>
                  </td>
                ):(
                  <td>
                    <button onClick={()=>unblockuser(user._id)} className='text-deep-orange-600'>Block</button>
                  </td>
                )}
                 
{/*                 
                  <td>
                    <button onClick={()=>unblockuser(user._id)}>Unblock</button>
                  </td> */}
                
              </td>
            </tr>
          
        </tbody>
     

 
  )
}

export default Singleadminuserlist