import React, { useEffect, useState } from "react";
import { addPost } from "../../api/apiConnections/postConnection";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  MenuItem,
  Input,
  Avatar,
  ListItem
} from "@material-tailwind/react";
import { setAllposts } from "../../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { followingDetails } from "../../api/apiConnections/userConnections";
import { PROFILE_POST_URL } from "../../api/baseURL";

export function Followingdialogbox({ open, handleOpen }) {
  const userId = useSelector((state) => state.user.userId);
  const [followingresponse, setFollowingResponse] = useState([]); // State to store following data

  useEffect(() => {
    following();
  }, []);

  const following = async () => {
    const followingresponses = await followingDetails(userId);
     setFollowingResponse(followingresponses); // Store following data in state
  };

  return (
    <Dialog size="sm" open={open} handler={handleOpen} className="h-96 overflow-y-scroll">
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Following
        </Typography>

        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>

      {followingresponse.length?followingresponse.map((following) => {
        return (
          <div className="">
          <DialogBody key={following.result.userId} className=" pr-2">
            <div className="mb-6 flex">
              {following.result.profilePic=" "?(<div className="mt-4 ms-2">
                <Avatar
                    src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                    size="sm"
                  /></div> ):( <div>
                <Avatar src={PROFILE_POST_URL + following.result.profilePic} alt="" size="md" />
              </div>)}
             
              <div className="flex flex-col -mx-2">
                <div className="flex">
                <div>
                    <div className="mx-3">{following.result.userName}</div>
                     <div className="text-sm text-blue-gray-400 mx-3">
                  {following.result.firstName} {following.result.lastName}
                </div>
                </div>
                {/* <div className="ms-64"><button>unfollow</button>
                </div> */}
                </div>
              

                
              </div>
            </div>
          </DialogBody>
          </div>
        );
      }):null}
    </Dialog>
  );
}
