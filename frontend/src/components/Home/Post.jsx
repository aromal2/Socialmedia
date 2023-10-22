import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,

} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SinglePost from "../../components/Home/SinglePost"
import { setAllposts } from "../../redux/slice";
import { CLOUDINARY_POST_URL } from "../../api/baseURL";
import {
  PaperAirplaneIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon
} from "@heroicons/react/24/solid";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";






TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

export function Post({allPost,setAllpost}) {
  const {userId,userName}= useSelector((state)=>state.user)
const dispatch=useDispatch()

 return (
   <div>
      {allPost.length?allPost?.map((post) => (
      
         <SinglePost post={post} key={post.postId} setAllpost={setAllpost} allPost={allPost} />)

      ):null}
      
    </div>   
  );
}
