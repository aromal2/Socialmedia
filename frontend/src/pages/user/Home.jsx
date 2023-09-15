import React from "react";
import { Leftsidebar } from "../../components/Home/Leftsidebar";
import { Rightsidebar } from "../../components/Home/Rightsidebar";
import { Post } from "../../components/Home/Post";
const Home = () => {
  return (
    <>
      <Leftsidebar />
      <Post />
      <Rightsidebar />
    </>
  );
};

export default Home;

