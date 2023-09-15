import React from 'react'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
  
  } from "@material-tailwind/react";

  import {
    PaperAirplaneIcon,
    ChatBubbleOvalLeftIcon,
    HeartIcon,
    EllipsisHorizontalIcon
  } from "@heroicons/react/24/solid";


  
  import TimeAgo from "javascript-time-ago";
  import en from "javascript-time-ago/locale/en";
  import { CLOUDINARY_POST_URL } from "../../api/baseURL";
  import { useSelector } from 'react-redux/es/hooks/useSelector';
  import { useEffect,useState } from 'react';
  import { likePost,unlikePost } from '../../api/apiConnections/postConnection';
  import ReportDialogbox from "../../components/Home/Reportdialogbox"

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo("en-US");


const SinglePost = (props) => {
    const userName=useSelector((state)=>state.user.userName)
    const likeStatus=props.data.liked.includes(userName)
    const [like,setLike]=useState(likeStatus)
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
      setOpen(!open)
    }

   
     const likehandler =async(postId)=>{
        if(like)
        {
           await  unlikePost(postId,userName)
            setLikelength()
            
        }else{
          await likePost(postId,userName)
        }
        setLike(!like)
        
           
       }
             

  return (
    <div className="h-screen flex-wrap  items-center ">
      <>
     <Card
          key={props.data.id}
          className="w-96 h-[35rem] m-5 mt-1"
          style={{ marginTop: "75px", marginLeft: "600px" }}
        >
          <Typography
            color="blue-gray"
            className="font-medium text-left text-gray-800 font-serif "
            textGradient
          >
            <div className="flex justify-between">
              <div>
              <div className="font-sans font-extralight text-base">
                {props.data.userName}
              </div>

              </div>
              
              <div className="text-gray-400 text-xs font-sans">
                {timeAgo.format(new Date(props.data.createdAt))}
              </div>
            </div>
          </Typography>

          <CardHeader floated={false} className="h-80">
            <img
              src={CLOUDINARY_POST_URL + props.data.imgVideoURL}
              alt="profile-picture"
            />
          </CardHeader>
          <CardBody className="text-center">
            <div className="flex space-x-4 ">

               <button onClick={()=>likehandler(props.data._id)}>{like? <HeartIcon class="h-6 w-6 text-custom-500" />:<HeartIcon className="h-8 w-6"></HeartIcon>}</button>
              
              <ChatBubbleOvalLeftIcon className="h-8 w-6"></ChatBubbleOvalLeftIcon>
              <PaperAirplaneIcon className="h-8 w-6"></PaperAirplaneIcon>
      
            <Menu placement="bottom-end" >
                <MenuHandler>
                <EllipsisHorizontalIcon class="h-6 w-6 text-gray-500 ml-44 cursor-pointer" />
               </MenuHandler>
               <MenuList>
                  <MenuItem  onClick={handleOpen}>Report</MenuItem>
                   <ReportDialogbox open={open} handleOpen={handleOpen} postId={props?.data?._id} userId={props?.data?.userId} />
                  <MenuItem>Delete the post</MenuItem>
                 </MenuList>
               </Menu>
            </div> 
          <div className="text-gray-400 text-xs">
                {props.data.liked.length}likes
                </div>
              <div className="flex">
                   <div className='flex me-2'>
                <Typography
                  color="blue-gray"
                  className="font-medium text-left text-gray-800 font-serif left-0 ms-1"
                  textGradient
                >
                  {props.data.userName}
                </Typography>
              </div>
              <div>
                <Typography
                  color="blue-gray"
                  className="font-sans text-left font-medium text-transparent ml-1"
                  textGradient
                >
                  {props.data.caption}
                </Typography>
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2">
            <Tooltip content="Like">
              <Typography
                as="a"
                href="#facebook"
                variant="lead"
                color="blue"
                textGradient
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {/* Like icon */}
                </svg>
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#twitter"
                variant="lead"
                color="light-blue"
                textGradient
              >
                <i className="fab fa-twitter" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#instagram"
                variant="lead"
                color="purple"
                textGradient
              >
                <i className="fab fa-instagram" />
              </Typography>
            </Tooltip>
          </CardFooter>
        </Card>
        </>
    </div>

  )
}

export default SinglePost