import React, { useEffect, useState } from "react";
import { addPost } from "../../api/apiConnections/postConnection";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { setAllposts } from "../../redux/slice"
import { useDispatch,useSelector } from "react-redux"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

export function Dialogbox({ open, handleOpen,setAllpost }) {
  const dispatch = useDispatch()
  const {userName,allpost}= useSelector((state)=>state.user)

  // Initial values for Formik
  const initialValues = {
    caption: "",
    selectedfile: null,
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    caption: Yup.string().required("Caption is required"),
    selectedfile: Yup.mixed().required("Image is required")
    .test(
      "fileType",
      "Only image files are allowed",
      (value) => value && value.type.startsWith("image/")
    ),
    
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    const userName = localStorage.user;
    const userId = localStorage.userid;
   console.log(values,"0000000000000000000000dialog");

    const response = await addPost(
      userName,
      values.selectedfile,
      values.caption,
      userId
    );
    

    console.log(response,"iiiiiiiiiiiiiiiiidialogbox");

    if (response) {
      setAllpost((posts)=>[response,...posts])
      dispatch(setAllposts(response))
      resetForm();
      handleOpen();
    }
    
  };

  return (
    <Dialog size="sm" open={open} handler={handleOpen}  className="">
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form encType="multipart/form-data">
              <div className="mb-6 flex">
                <div>
                  <label className="w-5 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue">
                  {/* <svg
                      className="w-3 h-4"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    > */}
                      <path
                        fillRule="evenodd"
                        d="M6.293 3.293a1 1 0 011.414 0L10 5.586l2.293-2.293a1 1 0 111.414 1.414L11.414 7l2.293 2.293a1 1 0 01-1.414 1.414L10 8.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 7 6.293 4.707a1 1 0 010-1.414zM2 5a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H5a3 3 0 01-3-3V5z"
                        clipRule="evenodd"
                      >+</path>
                    {/* </svg> */}
                    {/* <span className="mt-2 text-base leading-normal">
                      Select a Photo
                    </span> */}
                    <input
                      type="file"
                      name="selectedfile"
                      accept=".jpg,.jpeg,.mp4,.mpeg,.gif,.png"
                      className="hidden"
                      onChange={(event) =>
                        setFieldValue("selectedfile", event.target.files[0])
                      }
                    />
                  </label>
                </div>
                <div className="ms-8">
                  <img
                    src={
                      values.selectedfile
                        ? URL.createObjectURL(values.selectedfile)
                        : ""
                    }
                    alt="Preview"
                    className="w-96 h-96 mt-4 mb-1"
                  />
                </div>
              </div>

              <ErrorMessage
                name="selectedfile"
                component="div"
                className="text-red-500"
              />

              <div className="mt-1 ms-24">
                <Field
                  type="text"
                  name="caption"
                  placeholder="Add a caption..."
                  className="w-80  py-2 border rounded-lg focus:outline-none focus:border-blue focus:ring focus:ring-blue-200"
                />
                <ErrorMessage
                  name="caption"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mt-1 ms-12 text-center">
                <Button
                  type="submit"
                  color="blue"
                  size="sm"
                  onClick={handleOpen}
                >
                  Share
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogBody>
    </Dialog>
  );
}
