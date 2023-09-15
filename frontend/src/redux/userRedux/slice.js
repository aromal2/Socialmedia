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

const initialState = {
  token: getTokenlocal(),
  userName: getUsernamelocal(),
  responses: [],
  userId:getUserid()
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("user", action.payload);
    },
    setAllposts: (state, action) => {
      console.log(state.responses, "responses");
      state.responses.push(action.payload);
    },
    setLogout: (state, action) => {
      state.token = "";
      state.user = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUserid:(state,action)=>{
      console.log(action.payload,"2223333333111111111111");
      localStorage.setItem("userid",action.payload)
      

    }
  },
});

export const { setToken, setUser, setAllposts, setLogout,setUserid } = userSlice.actions;

export default userSlice.reducer;
