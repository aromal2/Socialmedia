import React, { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  IconButton,
  Textarea,
  Button,
} from '@material-tailwind/react';
import { editComments } from '../../api/apiConnections/postConnection';
// import { createContext } from 'react';
const Editcommentdialog = ({ open, handleOpen, commentId,getEdited }) => {
  const [editedCommentText, setEditedCommentText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);



  const editedComment = async () => {
    try {
      console.log(editedCommentText, "777777777777");
      const editedResponse = await editComments(commentId, editedCommentText);
      console.log(editedResponse,"99editedddd");
      if(editedResponse)
      {
           getEdited(editedResponse,commentId,editedCommentText)

      }

      
      
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    // Reset the input field and close the dialog
    setEditedCommentText('');
    setIsSubmitted(false);
    handleOpen();
  };

  return (
    <Dialog size="xs" open={open} handler={handleClose} className="overflow-y-scroll h-96">
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Edit a Comment
        </Typography>

        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleClose}
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

      <div>
        <DialogBody className="pr-2">
          <div className="w-96">
            <Textarea
              label="Message"
              value={editedCommentText}
              onChange={(e) => setEditedCommentText(e.target.value)}
            />
          </div>
          {!isSubmitted ? (
            <Button onClick={editedComment}>Submit Edited Comment</Button>
          ) : (
            <Typography className="text-blue-gray-500">Editing Submitted</Typography>
          )}
        </DialogBody>
      </div>
    </Dialog>
  );
};

export default Editcommentdialog;
