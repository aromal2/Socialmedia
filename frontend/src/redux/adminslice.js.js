import { createSlice} from "@reduxjs/toolkit"

const getTokenlocal=()=>{
    const token=localStorage.getItem("token")
    if(token) return token
}

const getAdminnamelocal=()=>{
    const adminname=localStorage.getItem("adminname")
    if(adminname) return adminname
}

const initialState= {
    token:getTokenlocal(),
    adminname:getAdminnamelocal()
}

const adminSlice=createSlice({
    name:"admin",
    initialState:initialState,
    reducers:{
        setToken:(state,action)=>{
            
            state.token=action.payload;
            localStorage.setItem("token",action.payload)
        },
        setAdminname:(state,action)=>{
            state.adminname=action.payload
            localStorage.setItem("adminname",action.payload)
        },
        setLogout:(state,action)=>{
            console.log("0000---slice");
            state.token=""
            localStorage.removeItem("token")
        }
    }
})

export const {setToken,setAdminname,setLogout}=adminSlice.actions

export default adminSlice.reducer