import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import Profile from "./pages/user/Profile";
import Adminlogin from "./pages/admin/Adminlogin";
import Adminhome from "./pages/admin/Adminhome";
import Adminuserlist from "./pages/admin/Adminuserlist";
import Admindashboards from "./pages/admin/Admindashboard";
import Message from "./pages/user/Message";
import { useSelector } from "react-redux";

function App() {
  const reduxToken = useSelector((state) => state.user.token);
  const admintoken = useSelector((state) => state.admin.token);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={!reduxToken ? <Signup /> : <Home></Home>}
        ></Route>

        <Route
          path="/login"
          element={!reduxToken ? <Login /> : <Home />}
        ></Route>

        <Route path="/" element={reduxToken ? <Home /> : <Login />}></Route>

        <Route
          path="/profile"
          element={reduxToken ? <Profile /> : <Login />}
        ></Route>

        <Route
          path="/adminlogin"
          element={!admintoken ? <Adminlogin /> : <Admindashboards />}
        ></Route>

        <Route path="/adminhome" element={<Adminhome />}></Route>

        <Route
          path="/adminuserlist"
          element={admintoken ? <Adminuserlist /> : <Adminlogin />}
        ></Route>

        
        <Route
          path="/message"
          element={ <Message/>}
        ></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
