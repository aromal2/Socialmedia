import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Form,
  Avatar
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { followers } from "../../api/apiConnections/userConnections";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { PROFILE_POST_URL } from "../../api/baseURL";


export function Followersdialogbox({ open, handleOpen }) {
  const dispatch = useDispatch();
  const [followersData, setFollowersData] = useState([]);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    fetchFollowers();
  }, [open]);

  // Function to fetch followers data
  const fetchFollowers = async () => {
    try {
      const followersResponse = await followers(userId);
      console.log(followersResponse,"follooooooowersssssssssssss");
      setFollowersData(followersResponse);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  console.log(followersData,"222222111111111111111followerdata");
  return (
    <Dialog size="sm" open={open} handler={handleOpen} className="overflow-y-scroll h-96">
      <DialogHeader className=" flex justify-between items-center">
        <Typography variant="h5" color="blue-gray">
          Followers
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

      
        { followersData.length ? followersData.map((followers)=>{
        return (
          <div>
          <DialogBody  className=" pr-2">
            {console.log(followers.result.profilePic,"44444444444444433333333333333")}
            <div className="mb-6 flex ms-1">
              {followers.result.profilePic ===" "?(<div>
                <Avatar src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" size="md" />
              </div>):( <div>
                <Avatar src={PROFILE_POST_URL+followers.result.profilePic} size="md" />
              </div>)}
             
              <div className="flex flex-col -mx-2">
                <div className="mx-3">{followers.result.userName}</div>
                <div className="text-sm text-blue-gray-400 mx-3">
                {followers.result.firstName} {followers.result.lastName}

                <button></button>
                </div>
              

                
              </div>
            </div>
          </DialogBody>
          </div>


        )

        }): null}
          
        
    </Dialog>
  );
}
