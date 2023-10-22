import React, { useEffect } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { useState } from 'react';
  import { useSelector } from 'react-redux/es/hooks/useSelector';
  import { CLOUDINARY_POST_URL } from '../../api/baseURL';
  import { singleUserdetails,getsavedPost} from '../../api/apiConnections/userConnections';
const Saved = () => {
const [savedpost,setSavedpost]=useState([])
let userId=useSelector((state)=>state.user.userId)
useEffect(()=>{
    getsavedPost
},[])

const getsavedPost=async()=>{
       const getSavedpostresponse= await getsavedPost(userId)
     }
  return (
  <>
  <p>a</p>
  </>
  )
}

export default Saved