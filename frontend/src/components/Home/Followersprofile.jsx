import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
  DialogFooter,
} from "@material-tailwind/react";
import { PROFILE_POST_URL } from "../../api/baseURL";
import { useEffect } from "react";
import {
  followPost,
  profilePost,
  unfollowPost,
} from "../../api/apiConnections/userConnections";
import { CLOUDINARY_POST_URL } from "../../api/baseURL";
import { useSelector } from "react-redux";
import { singleUserdetails } from "../../api/apiConnections/userConnections";

const Followersprofile = ({ open, handleOpen, searchedData }) => {
  let userId = useSelector((state) => state.user.userId);
  const [profilePosts, setProfileposts] = useState([]);
  const [opens, setOpens] = useState(false);
  let followfollowers=searchedData.following.includes(userId)

  // let follower=searchedData.followers.includes(userId)


  console.log(followfollowers,"p0iiiiiiii");
  const [followersinclude,setFollowersinclude]=useState(followfollowers)
  const [followerslength,setFollowerslength]=useState(searchedData.followers.length)
   
   const [followinglength,setFollowinglength]=useState(searchedData.following.length)

  console.log(followersinclude,"5followerssss");
  console.log(searchedData,"11111111000444444444444444");

  useEffect(() => {
    fetchProfilePost();
    userdetails()
  }, [open])

  const fetchProfilePost = async () =>{
    const profilepostresponse = await profilePost(searchedData._id)
    console.log(profilepostresponse,"111111111222222222222255555555")
    setProfileposts(profilepostresponse)
  }
 
 
  const handleOpens = () =>{
    setOpens(!opens);
  }

 

  const userdetails = async () =>{
    const userResponse = await singleUserdetails(userId);
    console.log(userResponse)
  }




  const handleDialogClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent elements
  };

  const handleClose = () => {
    handleOpens(); // Call the handleOpen function to close the dialog
  };

  const follow =async(auserId)=>{

  const followresponse= await followPost(userId,auserId)

  console.log(followresponse,"22222222followresponseeeeee");

  if(followresponse)
  {
    setFollowersinclude(!followersinclude)
     setFollowerslength(followerslength+1)
  }
  }
  
  const unfollow =async(auserId)=>{
  
    
    const unfollowresponse=await unfollowPost(userId,auserId)
    if(unfollowresponse)
    {
      setFollowersinclude(!followersinclude)
       setFollowerslength(followerslength-1)
    }
    }
    
  

  return (
    <Dialog
      size="xxl"
      open={open}
      handler={handleOpen}
      onClick={handleDialogClick}
      className="w-20" // Prevent closing when clicking inside the dialog
    >
      {/* <DialogHeader>
        <h5 className="text-xl ">Dialog Title</h5>
      </DialogHeader> */}

      <DialogBody>
        
      <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleOpen}
        >
          <i className="material-icons">close</i>
        </IconButton>
        <div className="w-[calc(100vw-16rem)] fixed right-0 overflow-y-scroll ">
        
          <div className="h-screen">
            <div className="border-b-2 flex justify-center items-center h-64  ">
              <div className="flex flex-col items-center w-60 rounded-none">
                {/* Render profile picture if the source is not empty */}
               {searchedData.profilePic ===" "?(<img   src="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
              alt="profilepicture"
              className='h-36 w-36 ms-36 mt-19 rounded-full mb-6'></img>):(<img
                  src={PROFILE_POST_URL + searchedData.profilePic}
                  alt=""
                  className="h-36 w-36 ms-36 rounded-full mb-6 mt-19 "
                />)}
                {/* <img
                  src={PROFILE_POST_URL + searchedData.profilePic}
                  alt=""
                  className="h-36 w-36 ms-36 rounded-full mb-6 mt-19 "
                /> */}
              </div>

              <div className="flex ms-20">
                <div className="">
                  <p className="mb-8 text-blue-gray-700">
                    {profilePosts.length} posts
                  </p>
                  <p className="mb-14 text-black -mt-1 ms-2">{searchedData.userName}</p>
                </div>
                <div className="ms-14">
                  <div className="mb-8 text-blue-gray-700 ms-4">
                    {/* Render 'followers' based on your data */}
                    {followerslength} followers
                  </div>

                  {followersinclude ===true ? (
                     <Button
                     variant="gradient"
                     className="rounded-full -mt-2 me-1 border-gray-800 text-xs"
                     size="sm"
                     onClick={() => unfollow(searchedData._id) }
                   >unfollow
                   </Button>) : (<Button
variant="gradient"
className="rounded-full -mt-2 me-1 border-gray-800 text-xs"
size="sm"
onClick={() => follow (searchedData._id)}
>
follow
</Button>
)}







                </div>

                <div className="ms-12 ">
                  <p className="mb-8 text-blue-gray-700">
                    {/* Render 'following' based on your data */}
                    {followinglength} following
                  </p>
                </div>
              </div>
            </div>

            <Card className=" grid grid-cols-3 gap-4">
              {profilePosts.map((post, index) => (
                <div key={index}>
                  <CardHeader floated={false} className="">
                    <img
                      src={CLOUDINARY_POST_URL + post.imgVideoURL}
                      alt=""
                      className="h-96 w-80"
                    />
                  </CardHeader>
                  <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                      {post.title}{" "}
                      {/* Replace with the appropriate property from your profilePost */}
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="font-medium"
                      textGradient
                    >
                      {post.description}{" "}
                      {/* Replace with the appropriate property from your profilePost */}
                    </Typography>
                  </CardBody>
                  <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
                </div>
              ))}
            </Card>
          </div>
        </div>
        
      </DialogBody>
      <DialogFooter></DialogFooter>
    </Dialog>
  )
              }


export default Followersprofile;
