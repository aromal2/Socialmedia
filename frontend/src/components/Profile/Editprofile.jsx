import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { changeProfilephoto } from "../../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../api/apiConnections/userConnections";
import { PROFILE_POST_URL } from "../../api/baseURL";
function EditProfile({ open, handleOpen }) {
  const dispatch=useDispatch();
  const {userId,profilePhoto} = useSelector((state) => state.user);
  const [selectedfile,setSelectedfile]=useState('')
  const [isImageSelected, setIsImageSelected] = useState(false);
  const initialValues = {
    editedfile: null,

    bio: "",
    gender: "Men", // Set a default value for gender
  };

  

  const validationSchema = Yup.object({
    editedfile: Yup.mixed().required("Image is required"),
    bio: Yup.string().required("Bio is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log(values,"4444444444444");
      // const formData = new FormData();
      // formData.append("userId", userId);
      // formData.append("bio", values.bio);
      // formData.append("gender", values.gender);
      // formData.append("editedfile", values.editedfile);

      const response = await editProfile(
        userId,
        values.bio,
        values.gender,
        values.editedfile
      );
      console.log(response,"881profilephotooo");

      dispatch(changeProfilephoto(response?.profilePic))
      
       resetForm();

      // Close the dialog
      handleOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

 

  return (
    <Dialog size="md mt-5" open={open} onClose={() => handleOpen(false)}>
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Edit Profile
        </Typography>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={() => handleOpen(false)}
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
            <Form>
              <div className="flex">
                <div className="w-1/3 h-3/4">
                  <div className="h-40 w-40">
                    <img
                      src={
                        isImageSelected
                          ? URL.createObjectURL(values.editedfile):(PROFILE_POST_URL+profilePhoto)||"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"}
                      alt="Preview"
                      className="max-w-full h-auto mt-4"
                    />
                  </div>
                  <div className="">
                    <div className="mt-7 me-3">
                      <label className="w-2 h-1 flex flex-col items-center px-9 py-6  text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer ">
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
                        <span className="mt-1  h-1 text-sm leading-normal">
                          Select
                        </span>
                        <input
                          type="file"
                          name="editedfile"
                          accept=".jpg,.jpeg,.mp4,.mpeg,.gif,.png"
                          className="hidden"
                          onChange={(event) =>{
                            setFieldValue("editedfile", event.target.files[0])
                            setIsImageSelected(true)
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="bio"
                      placeholder="Add a Bio..."
                      className="w-72 h-20 px-4 py-2 border border-solid  focus:outline-blue-gray-100  "
                    />
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mt-2">
                    <Select
                      size="lg"
                      name="gender"
                      label="Gender"
                      value={values.gender}
                      onChange={(event) =>
                        setFieldValue("gender", event.target.value)
                      }
                    >
                      <Option value="Men">Men</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
              </div>

              <ErrorMessage
                name="editedfile"
                component="div"
                className="text-red-500"
              />

              <div className="mt-2 text-center">
                <Button type="submit" color="custom-500" size="sm">
                  Set
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogBody>
    </Dialog>
  );
}

export default EditProfile;
