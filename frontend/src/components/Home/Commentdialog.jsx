import React, { useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
  Input,
} from "@material-tailwind/react";
import { useEffect } from "react";
import {
  addComment,
  getComments,
} from "../../api/apiConnections/postConnection";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { CLOUDINARY_POST_URL } from "../../api/baseURL";
import Singlecommentdialog from "./Singlecommentdialog";

export function Commentdialog({ open, handleOpen, postId, post }) {
  const [getcomments, setGetcomments] = useState([]);
  const [comment, setComment] = useState("");
  const [commented, setCommented] = useState("");
  const [commentId, setCommentId] = useState("");

  const userId = useSelector((state) => state.user.userId);
  const userName = useSelector((state) => state.user.userName);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (open) {
      getComment();
    }
  }, [open]);

  

  const addComments = async () => {
    if (comment.trim() !== "") {
      const commentResponse = await addComment(
        postId,
        userId,
        userName,
        comment,
        commented,
        commentId
      );

      setGetcomments((previous) => [commentResponse,...previous]);

      setComment("");
      setCommented("")
      setCommentId("");
    }
  };

  const getComment = async () => {
    const getCommentresponse = await getComments(postId);
    setGetcomments(getCommentresponse);
  };
  



  const getafterdelete =  (commentId) => {
    const deleted = getcomments.filter((commentdata) => commentdata._id !== commentId)
    setGetcomments(deleted);
  };

  // const getEdited=(editedResponse)=>{
  // setGetcomments((previous)=>[...previous,editedResponse])
  // }

  
  

  const focusTextAreaReply = (commentId, comment) => {
    if (textAreaRef?.current) {
      textAreaRef.current.focus();
      console.log( commentId,comment, "666666666ttt");
      setCommented(comment);
      setCommentId(commentId);
    }
  };

  const stopPropagation = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent elements
  };

  return (
    <>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        style={{ height: "90vh" }}
        className="w-80 overflow-hidden"
        onClick={stopPropagation}
      >
        {/* <DialogHeader className="justify-center"> */}
          {/* <div className="flex items-center gap-3 h-14 w-24">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src=""
            />
            <div className="-mt-px flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"

              >
                Tania Andrew
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                @canwu
              </Typography>
            </div>
          </div> */}
          {/* <div className="flex items-center gap-2">
            <IconButton
              variant="text"
              size="sm"
              color={isFavorite ? "red" : "blue-gray"}
              onClick={handleIsFavorite}
            >
              <svg
                xmlns=""
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </IconButton>
          </div> */}

        {/* </DialogHeader> */}

         <div className="flex w-full h-full">
           <div className="w-3/4 h-1/2"> 
             <DialogBody  className="w-full h-100">
            <img

            
              alt="nature"
              className="object-cover w-full h-[40rem] "

           src={post ? CLOUDINARY_POST_URL + post.imgVideoURL : ''}
            />
            </DialogBody> 
           </div>

           <div className="flex flex-col justify-between pt-4">
            <div className="overflow-y-scroll h-[34rem] ms-5" >
              {getcomments.map((commentdata) => {
                return (
                  <Singlecommentdialog
                    key={commentdata._id}
                    comm={commentdata}
                    focusTextAreaReply={focusTextAreaReply}
                    getafterdelete={getafterdelete}
                  
                  />
                );
              })}
            </div>

            <div className="flex flex-row ms-10 ">
              <input
                ref={textAreaRef}
                className="bg-blue-gray-100 focus:outline-none focus:border-none rounded-3xl  "
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <Button
                className=" bg-custom-500 "
                onClick={addComments}
                size="sm"
              >
                Send
              </Button>
            </div>
          </div>
        </div> 

        {/* <DialogFooter className="justify-between">
          <div className="flex items-center gap-16">
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Views
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                44,082,044
              </Typography>
            </div>
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Downloads
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                553,031
              </Typography>
            </div>
          </div>
          <Button
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                clipRule="evenodd"
              />
            </svg>
            Share
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
}
