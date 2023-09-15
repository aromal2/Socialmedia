import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,

} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllposts,likePost} from "../../api/apiConnections/postConnection";
import SinglePost from "../../components/Home/SinglePost/"


import { CLOUDINARY_POST_URL } from "../../api/baseURL";
import {
  PaperAirplaneIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";






TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

export function Post() {
  const [allpost, setAllposts] = useState([]);
  const responses = useSelector((state) => state.user.responses);
  responses.sort((a, b) => b - a);
  const userName= useSelector((state)=>state.user.userName)


  useEffect(() => {
    Allposts();
  }, []);

 const Allposts = async () => {
    const postResponse = await getAllposts();
    setAllposts(postResponse);
  };


   return (
   <div>
      {allpost.map((post) => (
        <SinglePost data={post}/>)

      )}
      

    </div>   
  );
}
