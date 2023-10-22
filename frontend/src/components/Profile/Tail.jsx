import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardHeader,
} from "@material-tailwind/react";
import { singleuserPost } from "../../api/apiConnections/postConnection";
import { useSelector } from "react-redux";
import { CLOUDINARY_POST_URL } from "../../api/baseURL";
import { getsavedPost } from "../../api/apiConnections/userConnections";
import { Commentdialog } from "../Home/Commentdialog";

const Tail = () => {
  const [userpost, setUserpost] = useState([]);
  const [savedPost, setSavedpost] = useState([]);
  const [opens, setOpens] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const [activeTab, setActiveTab] = useState("Posts");
  const [selectedPost, setSelectedPost] = useState(null);
  const [postId,setPostId]=useState(null)


  useEffect(() => {
    userPost();
    getSaved();
  }, []);

  const handleOpens = () => {
    setOpens(!opens);

  };
  

  const userPost = async () => {
    const postResponse = await singleuserPost(userId);
    setUserpost(postResponse);
  };

  const getSaved = async () => {
    const getSavedresponse = await getsavedPost(userId);
    setSavedpost(getSavedresponse);
  };

  const posted=async (post)=>{
    setSelectedPost(post);
    setPostId(post._id)

    handleOpens(opens);
  }

  return (
    <>
      <Tabs value="Posts" className="">
        <TabsHeader className="bg-custom-500">
          <Tab value="Posts"  onClick={() => setActiveTab("Posts")}
            className={`${
              activeTab === "Posts" ? "  text-black" : "text-gray-600"
            }`}>Posts</Tab>
          <Tab value="Saved" onClick={() => setActiveTab("Saved")} className={`${
              activeTab === "Saved" ? " text-black" : "text-gray-600"
            }`} >Saved</Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value="Posts" className="grid grid-cols-3 gap-14 ">
          {userpost.length?userpost.map((post) => (
            
            <div key={post._id} >
              {/* <Card key={post._id} className="w-72 ">
                <CardHeader shadow={false} floated={false} className="h-80 "> */}
                  <img
                    src={CLOUDINARY_POST_URL + post.imgVideoURL}
                    alt="card-image"
                    className="h-96 w-96 object-cover flex"
                    onClick={()=>
                      posted(post)
                    
                  }
                    
                   />
                  
                  

                {/* </CardHeader>
              </Card> */}
              </div>
          )):null}
          </TabPanel>
          <Commentdialog 
            open={opens}
            handleOpen={handleOpens}
            post={selectedPost}
            postId={postId}
             /> 

        <TabPanel value="Saved" className="grid grid-cols-3 gap-4"  >
          {savedPost.length?savedPost.map((post) => {
            return(
              <Card key={post._id} className=" ">
                <CardHeader shadow={false} floated={false} className="">
                  <img
                    src={CLOUDINARY_POST_URL + post.image}
                    alt="card-image"
                    className="h-96 w-96 object-cover flex"
                  />
                </CardHeader>
              </Card>
            )}
            ):null}
            </TabPanel>
        </TabsBody>
      </Tabs>
    </>
  );
};


export default Tail;
