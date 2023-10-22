import { createSlice } from "@reduxjs/toolkit";

const getTokenlocal = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
};
const getUsernamelocal = () => {
  const userName = localStorage.getItem("user");
  if (userName) {
    return userName;
  }
};

const getUserid=()=>{
  const userid=localStorage.getItem("userid")
  if(userid)
  {
    return userid; 
  }
}

const getProfilephoto=()=>{
  const profilePhoto=localStorage.getItem("profilephoto")
  if(profilePhoto)
  {
    return profilePhoto
  }
}

const getEmail=()=>{
  const email=localStorage.getItem("email")
  if(email)
  {
    return email
  }
}


const initialState = {
  token: getTokenlocal(),
  userName: getUsernamelocal(),
  allpost: [],
  userId:getUserid(),
  profilePhoto:getProfilephoto(),
  email:getEmail()
};


const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      console.log(action.payload,"loginnnnnnnnnnnn");
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("user", action.payload);
    },
    setAllposts: (state, action) => {
      console.log(action.payload,"actionnnnnnnnnnns");

      // state.allpost = action.payload
      localStorage.setItem("post", action.payload);
    },
    setLogout: (state, action) => {
      state.token = "";
      state.user = "";
      state.userId="";
      state.profilePhoto="";
      state.email=""
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userid");
      localStorage.removeItem("profilephoto")
      localStorage.removeItem("email")
      

    },
    setUserid:(state,action)=>{
      state.userId=action.payload
      localStorage.setItem("userid",action.payload)
      

    },
    setEmail:(state,action)=>{
      state.email=action.payload
      localStorage.setItem("email",action.payload)
    },
    changeProfilephoto:(state,action)=>{
      state.profilePhoto=action.payload
      localStorage.setItem("profilephoto",action.payload)
    }
  },
});

export const { setToken, setUser, setAllposts, setLogout,setUserid, changeProfilephoto,setEmail} = userSlice.actions;

export default userSlice.reducer;
