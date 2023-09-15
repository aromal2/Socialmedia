import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { signUp } from "../../api/apiConnections/authConnection";
import { setToken, setUser } from "../../../src/redux/userRedux/slice";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
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
  Select,
  Option,
} from "@material-tailwind/react";

export function SignUpCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = React.useState(30);

  const handleAgeChange = (value) => {
    setSelectedAge(value);
    formik.setFieldValue("age", value);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "", // Add firstName field
      lastName: "", // Add lastName field
      userName: "",
      email: "",
      password: "",
      rePassword: "",
      gender: "Male", // Default gender
      age: selectedAge, // Default age
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, "Must be less than 20 characters")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be less than 20 characters")
        .required("Required"),
      userName: Yup.string()
        .max(20, "Must be less than 20 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Must be less than 20 characters")
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      age: Yup.number()
        .max(120, "Age must be less than 120")
        .min(1, "Age must be greater than 1")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const data = { ...values, rePassword: undefined };
      const response = await signUp(data);
      console.log(response, "66666666666666666");

      if (response?.status === "success") {
        if (response?.token) {
          dispatch(setUser(response.user.userName));
          dispatch(setToken(response?.token));
        }
        navigate("/");
      }
    },
  });

  const genderOptions = ["Male", "Female", "Other"];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-center items-center mt-28">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>

          <CardBody className="flex flex-col gap-4">
            <Input
              type="text"
              id="firstName"
              size="lg"
              label="First Name"
              {...formik.getFieldProps("firstName")}
            />
            <p className="h-6 ml-2 text-sm text-red-800">
              {formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : null}
            </p>

            <Input
              type="text"
              id="lastName"
              size="lg"
              label="Last Name"
              {...formik.getFieldProps("lastName")}
            />
            <p className="h-6 ml-2 text-sm text-red-800">
              {formik.touched.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : null}
            </p>

            <Input
              type="text"
              id="userName"
              size="lg"
              label="User Name"
              {...formik.getFieldProps("userName")}
            />
            <p className="h-4 ml-2 text-sm text-red-800">
              {formik.touched.userName && formik.errors.userName
                ? formik.errors.userName
                : null}
            </p>

            <Input
              label="Email"
              size="lg"
              id="email"
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
              id="password"
              name="password"
              type="password"
              {...formik.getFieldProps("password")}
            />
            <p className="h-4 ml-2 text-sm text-red-800">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null}
            </p>
            <Input
              label="Repassword"
              size="lg"
              id="rePassword"
              name="rePassword"
              type="password"
              {...formik.getFieldProps("rePassword")}
            />
            <p className="h-4 ml-2 text-sm text-red-800">
              {formik.touched.rePassword && formik.errors.rePassword
                ? formik.errors.rePassword
                : null}
            </p>
            <Select
              label="Gender"
              id="gender"
              name="gender"
              onChange={(value) => {
                formik.setFieldValue("gender", value);
              }}
            >
              {genderOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
            <div className="mt-4">
              <label htmlFor="ageSlider">Age </label>
              <input
                id="ageSlider"
                type="range"
                min={1}
                max={120}
                step={1}
                onChange={(e) => handleAgeChange(parseInt(e.target.value))}
              />
              <label>{selectedAge}</label>
            </div>
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Submit
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                variant="small"
                color="gray"
                className="ml-1 font-bold"
              >
                <Link to="/login">Login</Link>
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
