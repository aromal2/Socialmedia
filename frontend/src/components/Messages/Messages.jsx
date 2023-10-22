import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Avatar, ListItem } from "@material-tailwind/react";
import { search } from "../../api/apiConnections/userConnections";
import { PROFILE_POST_URL } from "../../api/baseURL";
import { io, Socket } from "socket.io-client";
import { useRef } from "react";
import { createChats } from "../../api/apiConnections/chatConnection";
import { addMessage,getChatlists } from "../../api/apiConnections/messageConnection";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../../redux/chatslice";

const Messages = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchquery] = useState("");
  const [messageQuery, setMessagequery] = useState("");
  const [searchedData, setSearcheddata] = useState([]);
  const [chattinguserid, setChattinguserid] = useState("");
  const [chatId, setChatId] = useState("");
  const [chathead, setChathead] = useState("");
  const [message, setMessage] = useState([]);
  const [socketmessage, setSocketmessage] = useState({});
  const socket = useRef(null);
  const userId = useSelector((state) => state.user.userId);


  useEffect(() => {
    socket.current = io("http://localhost:5000", { transports: ["websocket"] });
    if (userId.length) {
      socket.current.emit("addnewuser", userId);
      socket.current.on("get-users", (users) => {
        dispatch(setOnlineUsers(users));
      });
    }
  }, [userId]);

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      console.log(data,"6666666666666222222222222222222");
      console.log(data.userId,"88888da111111ta")
      console.log(data.chattinguserid,"111111111chattinguserid");
       console.log(message,"88888hhhhhhhh888888886666message");
        if (data.chattinguserid === userId) {
          setMessage(prev=>[...prev, data])
        }
       
    };
    socket.current.on("receive-message", receiveMessageHandler)
  }, [userId]);

  useEffect(() => {
    socket.current.emit("send-message", socketmessage);
  }, [socketmessage]);

  useEffect(()=>{
    getChatlist()
  },[socketmessage])

  const onSearchChange = (e) => {
    setSearchquery(e.target.value);
  };

  const onMessageChange = (e) => {
    setMessagequery(e.target.value);
  };

  const handleSearch = async () => {
    const searchresponse = await search(searchQuery);
    setSearcheddata(searchresponse);
  };

  const chatprofile = async (userName, profilePic) => {
    setChathead({ userName, profilePic });
  };

  const createChat = async (chattingUserId) => {
    setChattinguserid(chattingUserId);
    const createchatresponse = await createChats(userId, chattingUserId);
    console.log(createchatresponse.messages,"888888888888833111111111111111responseeeeee");
    
      setMessage(createchatresponse.messages)
    
    

    console.log(message,"messageeee");
    setChatId(createchatresponse.chatId);
  };

  const sendAmessage = async () => {
    const addmessageresponse = await addMessage(
      chatId,
      userId,
      chattinguserid,
      messageQuery
    );

    if (addmessageresponse) {
      setMessage([...message, addmessageresponse]);
    }

    setSocketmessage({ ...addmessageresponse, chattinguserid });
  };

  const getChatlist=async()=>{
    const getChatlistresponse=await getChatlists(userId)
    console.log(getChatlistresponse,"response");
    setSearcheddata(getChatlistresponse)
  }

  return (
    <div className="">
      <div className="flex">
        <div className="">
          <div className=" ms-12 mt-12 h-[calc(100vh-10vh)] w-[calc(100vh)]  border border-gray-300">
            <h3 className="ms-16 font-sans font-bold mt-3">Chats</h3>

            <div>
              <input
                type="search"
                label="Search"
                value={searchQuery}
                onChange={onSearchChange}
                className="pr-20  border-b-blue-gray-300 p-1 rounded mt-9 w-[calc(100vh-15vh)]"
                autoFocus
              />
              <Button
                size="sm"
                disabled=""
                onClick={handleSearch}
                className=" right-1 top-1 rounded bg-custom-500  ms-2"
              >
                Search
              </Button>
            </div>

            <div>
              {searchedData.map((data) => {
                console.log(data,"44444444dataaromal");
                return (
                  <div onClick={() => createChat(data._id)}>
                    <ListItem
                      className="flex mt-6"
                      onClick={() =>
                        chatprofile(data.userName, data.profilePic)
                      }
                    >
                     {data.profilePic =" " ?(<Avatar
                        src="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
                        size="sm"
                        className="ms-6 mt-1"
                      />):(
                      <Avatar
                        src={PROFILE_POST_URL + data.profilePic}
                        size="sm"
                        className="ms-3 mt-1"
                      />)} 
                      <div >
                        <p className="ms-3 mt-1" >{data.userName}</p>
                        <p className="text-xs text-gray-400">{data.createTime}</p>
                      </div>
                    </ListItem>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border border-gray-400  w-[calc(100vh)] mt-12  flex flex-col justify-between ">
          <div>
            <div className="flex border border-gray-800 ">
            {chathead.profilePic ?(<Avatar
                src="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
                size="sm"
                className="ms-6 mt-1"
              />):( <Avatar
              src={PROFILE_POST_URL + chathead.profilePic}
              size="sm"
              className="ms-6 mt-2"
            />)}  
              <p className="mt-3 ms-4">{chathead.userName}</p>
            </div>

          <div className="overflow-y-scroll flex flex-col">
            <div className="h-[34rem] ">
              {message && message.length ? (
                message.map((singlemessage) => {
                  return (
                    <div key={singlemessage._id}>
                      {singlemessage.userId === userId ? (
                        <div className="">
                          <p className="w-28  mt-2  rounded-xl  text-white ms-3  shadow-sm shadow-gray-300 bg-custom-500 pl-3 pt-2 break-words">
                            {singlemessage.message}
                          </p>
                          <p> </p>
                        </div>
                      ) : (
                        <div className="self-left">
                          <p className="text-white w-24    mt-2  rounded-xl bg-gray-300 shadow-sm  shadow-gray-400 pl-3 pt-2 break-words">
                            {singlemessage.message}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div>no message</div>
              )}
            </div>
          </div>
          </div>

          <div className=" flex flex-col gap-2 ">
            <div className="flex">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendAmessage();
                }}
                encType="multipart/form-data"
              >
                <input
                  type="search"
                  label="Search"
                  value={messageQuery}
                  onChange={onMessageChange}
                  className="bg-gray-300 p-1 rounded  w-[calc(100vh-15vh)] h-[calc(100vh-95vh)]"
                />

                <Button
                  type="submit"
                  size="md"
                  disabled=""
                  className=" right-1 top-1 rounded bg-white text-black  ms-2 "
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
