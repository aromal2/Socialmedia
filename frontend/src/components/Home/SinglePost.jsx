import React from "react";

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
  Avatar,
} from "@material-tailwind/react";

import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  EllipsisHorizontalIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { CLOUDINARY_POST_URL } from "../../api/baseURL";
import { PROFILE_POST_URL } from "../../api/baseURL";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  likePost,
  unlikePost,
  deletePosts,
  commentsSize,
} from "../../api/apiConnections/postConnection";
import ReportDialogbox from "../../components/Home/Reportdialogbox";
import {
  saved,
  singleUserdetails,
  unsaved,
} from "../../api/apiConnections/userConnections";
import { Commentdialog } from "../Home/Commentdialog";
import { setAllposts } from "../../redux/slice";


 

const SinglePost = ({ post, setAllpost,allPost }) => {
  TimeAgo.addLocale(en)
 const timeAgo = new TimeAgo("en-US");
  const dispatch = useDispatch();
  const { userName, userId, allpost } = useSelector((state) => state.user);
  const likeStatus = post.liked.includes(userName);
  const [likelength,setLikelength]=useState(post.liked.length)
  const [like, setLike] = useState(likeStatus);
  const [opens, setOpens] = useState(false);
  const [open, setOpen] = useState(false);
  // const [deletepost,setDeletepost]=useState()
  const [length, setLength] = useState([]);
  const [commentlength, setCommentlength] = useState("");

  const [savedresponse, setSavedresponse] = useState(false);
  useEffect(() => {
    likehandler();
    singleuser();
    commentSize();
  }, [length]);

  const handleOpens = () => {
    setOpens(!opens);
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const likehandler = async (postId) => {
    if (like) {
      let likeresponse=await unlikePost(postId, userName);
           setLikelength(likelength-1)
    } else {
     
      let unlikeresponse=await likePost(postId, userName);
      setLikelength(likelength+1)
3

    }
    setLength(post.liked.length);
    setLike(!like);
  };

  const singleuser = async () => {
    const singleuserresponse = await singleUserdetails(userId)

    setSavedresponse(singleuserresponse[0].saved.includes(post.postId));
  };

  const savedPost = async (postId) => {
    const savedpost = await saved(userId, postId);
    console.log(savedpost, "savedddddd");
    if (savedpost) {
      setSavedresponse(!savedresponse);
    }
  };

  const unsavedPost = async (postId) => {
    const unsavedResponse = await unsaved(userId, postId);
    console.log(unsavedResponse, "unsaved");
    if (unsavedResponse) {
      setSavedresponse(!savedresponse);
    }
  };

  const deletePost = async () => {
    const deletepostresponse = await deletePosts(post.postId);
    if (deletepostresponse) {
      const filtereddata = allPost.filter((posts) => posts.postId !== post.postId);
      setAllpost(filtereddata);
    }
  };

  const singleUser = async () => {
    const singleuserresponse = await singleUser(userId);
    console.log(singleuserresponse,"333333333333333333");
  };

  const commentSize = async () => {
    const commentresponse = await commentsSize(post.postId);
    if(commentresponse)
    setCommentlength(commentresponse.length)
     
  };

  

  return (
    <div className=" flex-wrap  items-center ">
      <>
        <Card
          key={post.postId}
          className="w-2/5 h-[36rem] m-5 mt-1"
          style={{ marginTop: "80px", marginLeft: "450px" }}
        >
          <Typography
            color="blue-gray"
            className="font-medium text-left text-gray-800 font-serif "
            textGradient
          >
            <div className="flex justify-between">
              <div className="flex">
                {console.log(post.posteduserpic,"0000000000099999")}
                {post.posteduserpic ===" "?( <div className="mt-4 ms-2">
                <Avatar
                    src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                    size="sm"
                  /></div>
                
               ):( <div className="mt-4 ms-2">
               <Avatar
                 src={PROFILE_POST_URL + post.posteduserpic}
                 size="sm"
               />
             </div>)}
               
                <div className="font-sans font-extralight text-base ms-2 mt-7" onClick={()=>handleOpens(opens)}>
                  {post.postedUsername}
                </div>
                
              
              </div>
              <Commentdialog
                open={opens}
                handleOpen={handleOpens}
                postId={post.postId}
                post={post}
              />

              <div className="text-gray-400 text-xs font-sans me-3 mt-5">
              {/* {timeAgo.format(new Date(post.postcreatedAt))} */}
              </div>
            </div>
          </Typography>

          <CardHeader floated={false} className="h-4/5 mt-6">
            <img
              src={CLOUDINARY_POST_URL + post.imgVideoURL}
              alt="profile-picture"
            />
          </CardHeader>
          <CardBody className="text-center ms-1">
            <div className="flex space-x-4 ">
              <button onClick={() => likehandler(post.postId)}>
                {like ? (
                  <HeartIcon class="h-6 w-6 text-custom-500" />
                ) : (
                  <HeartIcon className="h-8 w-6 border-dotted" />
                )}
              </button>

              <button onClick={() => handleOpens(opens)}>
            
            <ChatBubbleOvalLeftIcon className="h-8 w-6"></ChatBubbleOvalLeftIcon>
              </button>
              
              <Commentdialog
                open={opens}
                handleOpen={handleOpens}
                postId={post.postId}
                post={post}
              />
              

              {/* <PaperAirplaneIcon className="h-8 w-6"></PaperAirplaneIcon> */}

              {savedresponse ? (
                <button>
                  <BookmarkIcon
                    class="h-6 w-6 text-gray-900"
                    onClick={() => unsavedPost(post.postId)}
                  />
                </button>
              ) : (
                <button>
                  <BookmarkIcon
                    className="h-6 w-6  mt-1  text-gray-300 outline-black "
                    onClick={() => savedPost(post.postId)}
                  />
                </button>
              )}

              <div className="me-2">
                <Menu placement="bottom-end">
                  <MenuHandler>
                    <EllipsisHorizontalIcon class="h-6 w-6 text-gray-500 ml-96 cursor-pointer mt-1" />
                  </MenuHandler>
                  <MenuList>
                    {post.postedUsername !== userName ? (
                      <>
                        <MenuItem onClick={() => handleOpen(open)}>
                          Report
                        </MenuItem>
                      </>
                    ) : <></>}
                    <ReportDialogbox
                      open={open}
                      handleOpen={handleOpen}
                      postId={post.postId}
                      postedUsername={post.postedUsername}
                    />
                    {post.postedUsername == userName ? (
                      <>
                        
                        <MenuItem onClick={deletePost}>
                          Delete the post
                        </MenuItem>
                      </>
                    ) : <></>}
                  </MenuList>
                </Menu>
              </div>
            </div>
             <div className="text-gray-400 text-xs">
                 {likelength}likes 
             </div> 
            <div className="flex">
              <div className="flex me-2">
                <Typography
                  color="blue-gray"
                  className="font-medium text-left text-gray-800 font-serif left-0 ms-1"
                  textGradient
                >
                  {post.postedUsername}
                </Typography>
              </div>
              <div>
                <Typography
                  color="blue-gray"
                  className="font-sans text-left font-medium text-transparent ml-1"
                  textGradient
                >
                  {post.caption}
                </Typography>
              </div>
            </div>

            <div>
              <Typography
                color="blue-gray"
                className="font-sans text-left font-medium text-transparent ml-1 text-gray-400 text-xs"
                textGradient
              >
                view {commentlength} comments
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2 ">
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
  );
};

export default SinglePost;
