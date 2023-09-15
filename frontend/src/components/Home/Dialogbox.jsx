import React, { useState } from "react";
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
} from "@material-tailwind/react";
import { setAllposts } from "../../redux/userRedux/slice";
import { useDispatch } from "react-redux";

export function Dialogbox({ open, handleOpen }) {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedfile] = useState(null);
  const [caption, setCaption] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userName = localStorage.user;
    const userId=localStorage.userid
  
    

    const response = await addPost(userName, selectedFile, caption,userId);

    if (response) {
      dispatch(setAllposts(response));
    }
  };

  return (
    <>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            Create new post
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

        <DialogBody className="overflow-y-scroll pr-2">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 3.293a1 1 0 011.414 0L10 5.586l2.293-2.293a1 1 0 111.414 1.414L11.414 7l2.293 2.293a1 1 0 01-1.414 1.414L10 8.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 7 6.293 4.707a1 1 0 010-1.414zM2 5a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H5a3 3 0 01-3-3V5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Select a Photo
                </span>
                <input
                  type="file"
                  name="selectedfile"
                  accept=".jpg,.jpeg,.mp4,.mpeg,.gif,.png"
                  className="hidden"
                  onChange={(event) => setSelectedfile(event.target.files[0])}
                />
              </label>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Add a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <div className="mb-6 text-center">
              <Button type="submit" color="blue" size="sm" onClick={handleOpen}>
                Share
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
