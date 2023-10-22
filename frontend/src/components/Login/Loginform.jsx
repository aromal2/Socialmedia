import React from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import {
  googlesignIn,
  signIn,
  googlesignup,
} from "../../api/apiConnections/authConnection";
import { useDispatch } from "react-redux";

import {
  changeProfilephoto,
  setToken,
  setUser,
  setUserid,
  setEmail
} from "../../redux/slice";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { auth, provider } from "../../googleauth/config";
import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import Home from "../../pages/user/Home";

export function Loginform() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });
  const handleClick = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      if (data.user.email) {
        const emailresponse = await googlesignIn(data.user.email);
              console.log(emailresponse,"666666666666666666644444444444");
        if (emailresponse.status === "success") {
          dispatch(setToken(emailresponse.token));
          dispatch(setUser(emailresponse.user.userName));
          dispatch(setUserid(emailresponse.user._id));
          dispatch(setEmail(emailresponse.user.email))

          navigate("/");
        }
        else {
        var userName = data.user.displayName;
        var email = data.user.email;
        
        
         const googlesignupresponse = await googlesignup(userName,email);
         console.log(googlesignupresponse,"uppppppppppppp");
         if(googlesignupresponse.status ==="success")
         {
          dispatch(setToken(googlesignupresponse.token))
          dispatch(setUser(googlesignupresponse.user.userName));
          dispatch(setUserid(googlesignupresponse.user._id));
           navigate("/");
         }
      }}


      else{
           console.log("no email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email Address").required("Required"),
      password: Yup.string()
        .max(20, "Must be less than 20 characters")
        .min(8, "must be at least 8 characters")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      console.log(values, "7777777777777777777777777loginform");
      const response = await signIn(values);
console.log(response,"lllllllllllllove");
      if (response.status === "success") {
        if (response.token) {
          dispatch(setToken(response.token));
          dispatch(setUser(response.user.userName));
          dispatch(setUserid(response.user._id));
          dispatch(changeProfilephoto(response.user.profilePic));
          dispatch(setEmail(response.user.email))
        }
        navigate("/");
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
  });
  return (
        <div >
        
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-center items-center mt-16 ms-96">
        <div className="-mt-32">
        <img src="/Moments (7).png" className="-ms-48 first-letter:bg-lime-50"></img>
        </div>
        <div>
        <Card className=" me-36 w-96 h-[36rem]">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            
            <Typography variant="h3" color="white">
              Login
            </Typography>

          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              name="email"
              {...formik.getFieldProps("email")}
            />
            <p className="h-4 ml-2 text-sm text-red-800">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null}
            </p>
            <Input
              label="Password"
              size="lg"
              name="password"
              {...formik.getFieldProps("password")}
            />
            <p className="h-4 ml-2 text-sm text-red-800">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null}
            </p>
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Submit
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center w-96">
              Don't have an account?
              <Typography
                as="a"
                variant="small"
                color="gray"
                className="ml-1 font-bold"
              >
              <Link to="/signup"> Sign up</Link>
              </Typography>
              
               <div>
                  {value ? (
                    <Home />
                  ) : (
                    <button onClick={handleClick} className="mt-16 ">Sign with Google</button>
                  )}
                </div>
             
            </Typography>
          </CardFooter>
        </Card>
        </div>
      </div>
    </form>
    </div>
  );
}
