import React from 'react'
import { useFormik } from 'formik'
import {useNavigate} from "react-router-dom"
import * as Yup from "yup"
import {useDispatch} from "react-redux"

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
import { Login } from '../../../api/apiConnections/adminAuthConnection'
import { setToken } from '../../../redux/adminslice.js'

const Adminloginform = () => {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

      onSubmit:async(values)=>{
        const response = await Login(values);

        if(response.status ==="success")
        {
           console.log(response.token,"token");
dispatch(setToken(response.token))

        }
        
navigate("/admindashboard")

        
      }
      
    })


  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="flex justify-center items-center mt-28 ms-96" >
      <img src=""></img>
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            AdminLogin
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            size="lg"
            name="Email"
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
          {/* <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            <Typography
              as="a"
              variant="small"
              color="gray"
              className="ml-1 font-bold"
            >
              {/* <Link to="/signup"> Sign up</Link> 
            </Typography>
          </Typography> */}
        </CardFooter>
      </Card>
    </div>
  </form>
)
}

export default Adminloginform