import React, { useEffect } from 'react';

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
import { userlist,unblock,block} from '../../../api/apiConnections/adminConnection';
import { useState } from 'react';
import { PROFILE_POST_URL } from '../../../api/baseURL';
import Singleadminuserlist from './Singleadminuserlist';





export function Adminuser() {
  
  useEffect(() => {
    userList();
  }, []);

  const [userlisted, setUserlisted] = useState([]);
  
  const TABLE_HEAD = ["Username", "Email", "Gender", "Age", "Userblock"];
  const userList = async () => {
    const userlistresponse = await userlist();
    console.log(userlistresponse, "hhhhhhhhhhh");
    setUserlisted(userlistresponse);
                
  };

//    const blockuser=async(userId)=>{
//     console.log(userId,"44444");
//     const blockresponse= await block(userId)
//    }

//    const unblockuser=async(userId)=>{
//     const blockresponse= await unblock(userId)
//    }




  return (

    <Card className="h-2/4 w-2/4 mx-auto mt-20"> {/* Center the card horizontally */}
    <CardHeader floated={false} shadow={false} className="rounded-none">
      {/* ... (previous code) */}
    </CardHeader>
    <CardBody className="px-0">
      <table className="w-full min-w-max table-auto text-left">
      <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th
                key={head}
                className={`border border-blue-gray-100 bg-custom-500 p-4 ${
                  index === 0 ? 'w-24' : '' // Adjust the width for the first column
                }`}
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>

    
       {userlisted.map((user, index) => (
      <Singleadminuserlist user={user}/>

       ))}
    

    </table>
    </CardBody>
    </Card> 
  )
}

export default Adminuser;
