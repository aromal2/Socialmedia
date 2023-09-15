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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/" element={<Home />}></Route>

        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
