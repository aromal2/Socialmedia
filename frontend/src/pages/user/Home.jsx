import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux"
import { Leftsidebar } from "../../components/Home/Leftsidebar";
import { Rightsidebar } from "../../components/Home/Rightsidebar";
import { Post } from "../../components/Home/Post";
import { getPosts } from "../../api/apiConnections/userConnections";


const Home = () => {
  const userId=useSelector((state)=>state.user.userId)
  const [allPost,setAllpost] = useState([])

  useEffect(() => {
    getAll()
  }, [])

 const getAll = async () => {
    const postResponse = await getPosts(userId)
    setAllpost(postResponse)
    
  }

  return (
    <>
      <Leftsidebar setAllpost={setAllpost} />
      <Post setAllpost={setAllpost} allPost={allPost} />
      <Rightsidebar />
    </>
  );
};

export default Home;

