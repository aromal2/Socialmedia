import React, { useEffect } from 'react'
import { useState } from 'react'
import {genderdetails,agedetails,userlist,totalpost} from "../../../api/apiConnections/adminConnection"
const Admindashboard = () => {
useEffect(()=>{
  gender(),
  age(),
  userList(),
  totalposts()
},[])

const [userresponses,setUseresponses]=useState("")
const [postresponses,setPostresponse]=useState("")

  const userList=async()=>{
    const userresponse=await userlist()
    console.log(userresponse.length);
    setUseresponses(userresponse.length)
  }

  const totalposts=async()=>{
    const postresponse=await totalpost()
    console.log(postresponse[0].count,"lllllllllllkglll");
    setPostresponse(postresponse[0].count)
  }



  const gender=async ()=>{
const genderresponse=await genderdetails()
console.log(genderresponse,"llllllllll");

  }

  const age =async ()=>{
    const ageresponse=await agedetails()
    console.log(ageresponse,"00000006666666");

  }
  return (
    <div className='overflow-y-scroll h-[42rem]'>

    <div className='overflow-ellipsis '>
<div className="flex justify-evenly items-center mt-32 ms-56">
  <div className="w-44 h-44  bg-custom-500 text-black p-4">
    <p className='ms-10 mt-14'>Total Users</p>
    <p className="text-center ">{userresponses}users</p>
  </div>
  <div className="w-44 h-44 bg-custom-500 text-white p-4">
  <p className='ms-10 mt-14'>Total Posts</p>
    <p className="text-center">{postresponses} posts</p>
  </div>
  <div className="w-44 h-44 bg-custom-500 p-4">
    <p className="text-center mt-14">Box 3</p>
  </div>
  <div className="w-44 h-44 bg-custom-500 p-4">
    <p className="text-center mt-14">Box 4</p>
  </div>
</div>
</div>
<div>

</div>

    </div>
  )
}

export default Admindashboard